import React from "react";
import { Button, Platform } from "react-native";
import ActionButton from "react-native-action-button";
import { Constants, Location, Permissions } from "expo";
import Aux from "../../hoc/Auxi";
import MapScreen from "../../components/MapScreen/MapScreen";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen";

import SERVER_URL from '../../constants/Config';

class UsersMap extends React.Component {
  state = {
    userLocation: null,
    nearbyTopics: [],
    errMessage: null,
    needsFetching: false
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  refresh = () => {
    Location.getCurrentPositionAsync()
      .then(coords => {
        return this._getTopicsDataAsync(coords);
      })
      .then(respJson => {
        console.log("response in refresh", respJson);
        if (respJson.length != this.state.nearbyTopics.length) {
          this.setState({ nearbyTopics: respJson });
        }
      })
      .catch(error => {
        console.log("Error while refreshing", error);
      });
  };

  componentDidMount() {
    if (!this.state.userLocation && !this.state.errMessage) {
      if (Platform.OS === "android" && !Constants.isDevice) {
        this.setState({
          errorMessage:
            "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
        });
      } else {
        this._getLocationAsync();
      }
    }

    this.subs = [
      this.props.navigation.addListener('willFocus', () => console.log('will focus')),
      this.props.navigation.addListener('willBlur', () => console.log('will blur')),
      this.props.navigation.addListener('didFocus', () => this.refresh()),
      this.props.navigation.addListener('didBlur', () => console.log('did blur')),
    ];

  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  _getTopicsDataAsync = async coords => {
    try {
      console.log("sending response");
      const url = `${SERVER_URL}/api/topics?latitude=${
        coords.coords.latitude
      }&longitude=${coords.coords.longitude}`;
      const response = await fetch(url);
      const respJson = response.json();
      return respJson;
    } catch (error) {
      console.log("error");
      throw error;
    }
  };

  /*
  * needs a look again
  */
  _getLocationAsync = async () => {
    let isLocationEnbaled = true;

    do {
      try {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== "granted") {
          this.setState({
            errMessage: "Permission to get location not obtained"
          });
          isLocationEnbaled = false;
          continue; // should close the app here
        }
        console.log("waiting for location");
        let retLocation = await Location.watchPositionAsync(
          { enableHighAccuracy: true },
          async coords => {
            console.log(coords);
            let respJson;
            try {
              respJson = await this._getTopicsDataAsync(coords);
              console.log("setting state");
              this.setState({
                userLocation: coords,
                nearbyTopics: respJson,
                errMessage: null
              });
             } catch (error) {
              this.setState({ errMessage: error.message });
            }
        });
        console.log("relocation", retLocation); 
      } catch (error) {
        console.log(error);
        this.setState({ errMessage: error.message });
        isLocationEnbaled = false;

      }
    } while (!isLocationEnbaled);
  };

  createNewTopic = (userLocation) => {
    console.log("Creating new topic ", userLocation);
  }

// TODO: should take buzz id and then fetch content from server 
  showDiscussionWindow = (topicId) => {

    this.props.navigation.navigate('ScreenThread', {'topicId': topicId});
  }

  render() {
    let text = "Loading....";
    if (this.state.errMessage) {
      text = this.state.errMessage;
    } else if (this.state.userLocation) {
      //console.log("calling render", this.state.nearbyTopics.length);
      return (
        <Aux>
          <MapScreen
            userLocation={this.state.userLocation}
            topicData={this.state.nearbyTopics}
            onClick={this.showDiscussionWindow}
          />
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() =>
              this.props.navigation.navigate('NewTopic', {'userLocation': this.state.userLocation})
            }
          />
        </Aux>
      );
    }
    return <ErrorScreen errorMessage={text} />;
  }
}

export default UsersMap;
