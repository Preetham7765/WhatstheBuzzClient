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

    componentDidMount() {

        if(!this.state.userLocation && !this.state.errMessage){

            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                });
            } else {                
                this._getLocationAsync();
                this.setState({needsFetching : false});
            }
        }

    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.needsFetching != prevState.needsFetching){
            this._getTopicsDataAsync();
            this.setState({needsFetching : false});
        }
    }

    _getTopicsDataAsync = async (coords) => {
        try {
            console.log("sending response");
            const url = `http://192.168.43.223:5000/api/topics?latitude=${coords.coords.latitude}&longitude=${coords.coords.longitude}`
            console.log(url);
            const response = await fetch(url);
            console.log("got response");
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
                        }
                        catch(error) {
                            this.setState({errMessage:error.message});            
                        }
                        console.log("setting state");
                        this.setState({ userLocation: coords , nearbyTopics: respJson});
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
            return (
                    <Aux>
                        <MapScreen userLocation={this.state.userLocation} 
                                   topicData={this.state.nearbyTopics}
                                   onClick = {this.props.discussion}/>
                        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.newTopic(this.state.userLocation)} />
                    </Aux>
            );
        }
        return <ErrorScreen errorMessage = {text} />
    }
}

export default UsersMap; 