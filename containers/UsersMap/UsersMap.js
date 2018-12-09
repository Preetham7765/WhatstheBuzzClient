import React from "react";
import { Platform, TouchableOpacity, Linking, BackHandler, AsyncStorage, Alert } from "react-native";
import ActionButton from "react-native-action-button";
import { Constants, Location, Permissions } from "expo";
import { IntentLauncherAndroid } from 'expo';
import SocketIOClient from 'socket.io-client';
import geolib from 'geolib';

import Aux from "../../hoc/Auxi";
import MapScreen from "../../components/MapScreen/MapScreen";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen";
import { SERVER_URL, REGION_SERVER_URL } from '../../constants/Config';
import { Icon } from 'react-native-elements';

import AsyncAlert from '../../components/AsyncAlert';

class UsersMap extends React.Component {
  state = {
    userLocation: null,
    nearbyTopics: [],
    errMessage: null,
    isMounted: false,
    regions: null
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.retLocation = null;
    this.socket = SocketIOClient(SERVER_URL + '/topics');
    this.socket.on('updateTopic', this.onReceivedNewTopic);
  }


  refresh = () => {

    console.log("Refresh: isMounted", this.state.isMounted);

    if (this.state.isMounted === false)
      return;

    Location.getCurrentPositionAsync()
      .then(coords => {
        return this._getTopicsDataAsync(coords);
      })
      .then(respJson => {
        // console.log("response in refresh", respJson);
        if (respJson.length != this.state.nearbyTopics.length) {
          this.setState({ nearbyTopics: respJson });
        }
      })
      .catch(error => {
        console.log("Error while refreshing", error);
      });
  };

  async componentDidMount() {
    if (!this.state.userLocation && !this.state.errMessage) {
      if (Platform.OS === "android" && !Constants.isDevice) {
        // this.setState({
        //   errorMessage:
        //     "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
        // });
        this._getLocationAsync();
      } else {
        this._getLocationAsync();
      }
    }

    try {
      this.enterpise = await AsyncStorage.getItem('enterprise') === 'true';
      this.enterpriseActive = await AsyncStorage.getItem('enterpriseActive');
    }
    catch (error) {
      console.log("NewTopicScreen: Failed to read from storage ", error);
      return;
    }


    this.subs = [
      this.props.navigation.addListener('willFocus', () => console.log('will focus')),
      this.props.navigation.addListener('willBlur', () => console.log('will blur')),
      this.props.navigation.addListener('didFocus', async () => {
        this.refresh();

      }),
      this.props.navigation.addListener('didBlur', () => {

      }),
    ];

  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
    if (this.retLocation) this.retLocation.remove();
    this.setState({ isMounted: false });
    const data= {
      id : this.userId,
      regions: this.regions
    }
    this.socket.emit("deleteUser", data);
    this.socket.disconnect();
  }

  _getTopicsDataAsync = async coords => {
    try {
      console.log("sending response");
      const url = `${SERVER_URL}/api/topics?latitude=${
        coords.coords.latitude
        }&longitude=${coords.coords.longitude}`;
      this.token = await AsyncStorage.getItem('token');
      this.userId = await AsyncStorage.getItem('userId');
      const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
      const response = await fetch(url, { headers: header });
      if (response.status === 401) {
        Alert.alert("Authorization failed. Please login again");
        this.props.navigation.navigate('Login');
        throw new Error("Authentication Failed");
      }
      const respJson = response.json();
      return respJson;
    } catch (error) {
      console.log("UsersMap failed to fetch", error);
      throw error;
    }
  };

  _getLocationAsync = async () => {
    console.log("insdie _getLocationAsync");
    try {
      let providerStatus = await Location.getProviderStatusAsync();
      console.log("Provider status", providerStatus);
      if (providerStatus.locationServicesEnabled == false || providerStatus.gpsAvailable == false) {
        let permission = await AsyncAlert('Please enable location services to continue');
        if (Platform.OS === "android") {
          // create an alert asking the user to enable location
          if (permission === "yes") {
            await IntentLauncherAndroid.startActivityAsync(
              IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
            );
          }
          else {
            BackHandler.exitApp();
          }
        }
        else if (Platform.OS === "ios") {
          if (permission === "yes") {
            await Linking.openURL("App-Prefs:root=Privacy&path=LOCATION");
          }
          else {
            // close the ios app don't know how to do.
          }
        }
      }
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        throw new Error("Permission to get location not obtained");
      }
      console.log("waiting for location");
      this.retLocation = await Location.watchPositionAsync(
        { enableHighAccuracy: false, distanceInterval: 300 },
        async coords => {
          try {

            respJson = await this._getTopicsDataAsync(coords);
            console.log("setting state");
            this.setState({
              userLocation: coords,
              nearbyTopics: respJson,
              errMessage: null,
              isMounted: true,
            });

            let regions;
            let respJson;
            const header = {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
            const regionParams = {
              lat: this.state.userLocation.coords.latitude,
              long: this.state.userLocation.coords.longitude,
              radius: 3000
            }

            const response = await fetch(`${REGION_SERVER_URL}/region/user`, {
              headers: header,
              method: "POST",
              body: JSON.stringify(regionParams)
            });
            respJson = await response.json();
            let filter_regions = [];
            regions = respJson['ids'];
            regions.forEach((element) => {
              filter_regions.push(element.slice(0, 8));
            });
            console.log("Filter regions : ", filter_regions);
            this.regions = filter_regions;
            const socketData = {
              id: this.userId,
              regions: [...filter_regions]
            }
            console.log("Sending user data");
            this.socket.emit("newUser", socketData);

          } catch (error) {
            console.log(error);
            this.setState({ errMessage: error.message, isMounted: true });
            this.retLocation.remove();
          }
        });
    } catch (error) {
      this.setState({ errMessage: error.message, isMounted: true });
    }

  }

  onReceivedNewTopic = (newTopic) => {

    console.log("got new topic from socket", newTopic);
    // append to the new topic
    const newTopicCords = { latitude: newTopic.loc.coordinates[1], longitude: newTopic.loc.coordinates[0] }
    const userCords = {
      latitude: this.state.userLocation.coords.latitude,
      longitude: this.state.userLocation.coords.longitude
    }
    if (geolib.isPointInCircle(newTopicCords, userCords, 3000)) {

      let currentTopics = [...this.state.nearbyTopics];

      currentTopics.push(newTopic);

      this.setState({ nearbyTopics: currentTopics });

    }

  }

  newTopicHandler = () => {

    if (!this.enterpise) {
      const url = `${SERVER_URL}/api/users/${this.userId}/reputation`;
      console.log(url);
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': this.token
        }
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error("Bad request, Try logging in again");
          }
          return response.json()
        })
        .then(respJson => {
          console.log("Navigating to newtopic", respJson);
          if (respJson.success === false) {

            throw new Error(respJson.errorMsg);
          }
          this.props.navigation.navigate('NewTopic', {
            'enterprise': this.enterpise,
            'enterpriseActive': this.enterpriseActive,
            'userLocation': this.state.userLocation,
            'sendThruSocket': (data) => { this.socket.emit("newTopic", data) }
          });
        })
        .catch(err => {
          Alert.alert(err.message);
        });
    }
    else {
      this.props.navigation.navigate('NewTopic', {
        'enterprise': this.enterpise,
        'enterpriseActive': this.enterpriseActive,
        'userLocation': this.state.userLocation
      });
    }
  }

  // TODO: should take buzz id and then fetch content from server
  showDiscussionWindow = (topicId) => {

    this.props.navigation.navigate('ScreenThread', { 'topicId': topicId });
  }

  render() {
    let text = "Loading....";
    if (this.state.errMessage) {
      text = this.state.errMessage;
    } else if (this.state.userLocation) {
      //console.log("calling render", this.state.nearbyTopics.length);
      return (
        <Aux>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 30,
              right: 5
            }}
            onPress={this.refresh}>
            <Icon name="refresh"
              raised />
          </TouchableOpacity>
          <MapScreen
            userLocation={this.state.userLocation}
            topicData={this.state.nearbyTopics}
            onClick={this.showDiscussionWindow}
          />
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.newTopicHandler}
          />
        </Aux>
      );
    }
    return <ErrorScreen errorMessage={text} />;
  }
}

export default UsersMap;