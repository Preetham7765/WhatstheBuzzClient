import React from "react";
import {Alert, AsyncStorage, Platform, TouchableOpacity} from "react-native";
import ActionButton from "react-native-action-button";
import {Constants, Location} from "expo";
import SocketIOClient from 'socket.io-client';
import Aux from "../../hoc/Auxi";
import MapScreen from "../../components/MapScreen/MapScreen";
import {REGION_SERVER_URL, SERVER_URL} from '../../constants/Config';
import {Icon} from 'react-native-elements';

class UsersMap extends React.Component {
    state = {
        userLocation: null,
        nearbyTopics: [],
        errMessage: null,
        isMounted: false,
        region: null
    };

    constructor(props) {
        super(props);
        this.props = props;
        this.retLocation = null;
        this.socket = new SocketIOClient(SERVER_URL);
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
                    this.setState({nearbyTopics: respJson});
                }
            })
            .catch(error => {
                console.log("Error while refreshing", error);
            });
    };

    async componentDidMount() {
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
            this.props.navigation.addListener('didFocus', () => this.refresh()),
            this.props.navigation.addListener('didBlur', () => console.log('did blur')),
        ];
    }

    componentWillMount() {
        this._getRegionIdAsync(this.state.userLocation);
        this.socket.on(this.state.region, (data) => {

            console.log("new data from rethink db at channel", this.state.region, " is  >>>>>>>>>", data);

        });
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
                        'userLocation': this.state.userLocation
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
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 30,
                            right: 5
                        }}
                        onPress={this.refresh}>
                        <Icon name="refresh"
                              raised/>
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
    }
}

export default UsersMap;
