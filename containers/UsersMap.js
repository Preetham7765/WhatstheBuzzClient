import React from 'react';
import { Button, Platform } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Constants, Location, Permissions } from 'expo';
import Aux from '../hoc/Auxi';
import MapScreen from '../components/MapScreen/MapScreen';
import ErrorScreen from '../components/ErrorScreen/ErrorScreen';

class UsersMap extends React.Component{

    state = {
        userLocation: null,
        nearbyTopics: [],
        errMessage: null,
        needsFetching: false
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    refreshMap = () => {
        Location.getCurrentPositionAsync()
        .then (coords => {
            return this._getTopicsDataAsync(coords)            
        })
        .then( (respJson) => {
            console.log("response in refresh", respJson);
            if(respJson.length != this.state.nearbyTopics.length){
                this.setState({nearbyTopics: respJson});
            }
        })
        .catch((error)=> {console.log("Error while refreshing", error);});
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

    _getTopicsDataAsync = async (coords) => {
        try {
            console.log("sending response");
            const url = `http://172.20.10.6:5000/api/topics?latitude=${coords.coords.latitude}&longitude=${coords.coords.longitude}`
            const response = await fetch(url);
            const respJson = response.json();
            return respJson;

        }
        catch(error) {
            console.log("error");
            throw error;
        }
    }

    _getLocationAsync = async () => {

        let isLocationEnbaled = true;

        do {
            try{
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
            
                if (status !== 'granted') {
                    this.setState({errMessage:"Permission to get location not obtained"});
                    isLocationEnbaled = false;
                    continue; // should close the app here
                }
                console.log("waiting for location");
                Location.watchPositionAsync({ enableHighAccuracy: true },
                    async coords =>  {
                        console.log(coords);
                        let respJson;
                        try {
                            respJson = await this._getTopicsDataAsync(coords);
                            console.log("setting state");
                            this.setState({ userLocation: coords , nearbyTopics: respJson, errMessage: null});
                        }
                        catch(error) {
                            this.setState({errMessage:error.message}); 
                        }
                    });
            }
            catch(error){
                console.log(error);
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
            //console.log("calling render", this.state.nearbyTopics.length);
            return (
                    <Aux>
                        <MapScreen userLocation={this.state.userLocation} 
                                   topicData={this.state.nearbyTopics}
                                   onClick = {this.props.discussion}/>
                        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.newTopic(this.state.userLocation, this.refreshMap)} />
                    </Aux>
            );
        }
        return <ErrorScreen errorMessage = {text} />
    }
}

export default UsersMap; 