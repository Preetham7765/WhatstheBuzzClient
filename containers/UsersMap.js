import React from 'react';
import { Platform } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Constants, Location, Permissions } from 'expo';
import Aux from '../hoc/Aux';
import MapScreen from '../components/MapScreen/MapScreen';
import ErrorScreen from '../components/ErrorScreen/ErrorScreen';

class UsersMap extends React.Component{

    state = {
        userLocation: null,
        nearbyTopics: null,
        errMessage: null
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

    _getLocationAsync = async () => {
        console.log("getting status");
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
                location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            }
            catch(error){
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
                        <MapScreen userLocation={this.state.userLocation}/>
                        <FloatingAction />
                    </Aux>
            );
        }
        return <ErrorScreen errorMessage = {text} />
    }
}

export default UsersMap; 