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
        nearbyTopics: null,
        errMessage: null
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentWillMount() {

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

    _getTopicsDataAsync = async() => {

        const response = fetch('http://localhost:5000/api/topics', {
            method: 'GET',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setState({nearbyTopics: response.json});
    }

    _getLocationAsync = async () => {
        
        let isLocationEnbaled = false;
        do {
            
           let { status } = await Permissions.askAsync(Permissions.LOCATION);
           
           if (status !== 'granted') {
                this.setState({
                errorMessage: 'Permission to access location was denied',
                });
            }
            
            let location = null;
            try{

                location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            }
            catch(error){
                console.log("error");
                this.setState({
                    errorMessage: 'Please turn on your location',
                  });
                isLocationEnbaled = false;
                continue;
            }
            console.log("got location");
            isLocationEnbaled = true;
            this.setState({ userLocation: location });

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
                        <MapScreen userLocation={this.state.userLocation} topicData={data}/>
                        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.newTopic(this.state.userLocation)} />
                    </Aux>
            );
        }
        return <ErrorScreen errorMessage = {text} />
    }
}

export default UsersMap; 