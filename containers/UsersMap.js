import React from 'react';
import { Button, Platform } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Constants, Location, Permissions } from 'expo';
import Aux from '../hoc/Auxi';
import MapScreen from '../components/MapScreen/MapScreen';
import ErrorScreen from '../components/ErrorScreen/ErrorScreen';


const data = [
    {
        id: 1,
        latitude: 39.173598,
        longitude: -86.5245202,
        title: "wpoeriu"
    },
    {
        id: 2,
        latitude: 39.172363,
        longitude: -86.5243053,
        title: "wwt74tr"
    },
    {
        id: 3,
        latitude: 39.172833,
        longitude: -86.5232433,
        title: "ahsdvja shydvcnsdghub bshe gvfysbdcbj sygd chbsdhg ah syhs hguydg"
    },
    {
        id: 4,
        latitude: 39.172351,
        longitude: -86.5247833,
        title: "abc",
    },
];
class UsersMap extends React.Component{

    state = {
        userLocation: null,
        nearbyTopics: [],
        errMessage: null
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {

        if(!this.state.userLocation && !this.state.errMessage){

            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                });
            } else {
                
                this._getLocationAsync();

            }
        }

    }

    _getTopicsDataAsync = async () => {

        try {

            const response = await fetch('https://sheltered-coast-22714.herokuapp.com/api/topics',
                            { method: 'GET',
                                mode:'cors',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            });
            const respJson = response.json();
            return respJson;

        }
        catch(error) {
            throw error;
        }
    }

    _getLocationAsync = async () => {

        let isLocationEnbaled = false;

        do {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
        
            if (status !== 'granted') {
                this.setState({errMessage:"Permission to get location not obtained"});
                continue; // should close the app here
            }
            
            let location = null;
            try{
                console.log("waiting for location");
                location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                let respJson = await this._getTopicsDataAsync();
                this.setState({ userLocation: location , nearbyTopics: respJson});
                console.log("got location");
                isLocationEnbaled = true;
            }
            catch(error){
                this.setState({errMessage:error.message});
            }

        }while(!isLocationEnbaled);
        
        
    }

    render() {
        let text= "Loading....";

        if(this.state.errMessage){
            text = this.state.errMessage;
        }
        else if(this.state.userLocation){
            return (
                    <Aux>
                        <MapScreen userLocation={this.state.userLocation} topicData={this.state.nearbyTopics}/>
                        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.newTopic(this.state.userLocation)} />
                    </Aux>
            );
        }
        return <ErrorScreen errorMessage = {text} />
    }
}

export default UsersMap; 