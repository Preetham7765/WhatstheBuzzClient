import React from 'react';
import {Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {Constants, Location, Permissions} from 'expo';

class UsersMap extends React.Component {

    state = {
        userLocation: null,
        nearbyEvents: null,
        errMessage: null
    }

    constructor(props){
        super(props);
        this.props = props;
    }

    componentWillMount() {

        //get the current location from the server here

        if(!this.state.userLocation && !this.state.errMessage){

            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                  errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                });
              } else {
                Permissions.askAsync(Permissions.LOCATION)
                .then((reponse)=> {
                    if(reponse.status !== 'granted'){
                        this.setState({errMessage: 'Permission to access location denied'});
                    }
                });

                Location.getCurrentPositionAsync({})
                .then((response) => {
                    console.log("Response" ,response);
                    this.setState({userLocation: response})
                });

            }
        }

    }


    render() {

        let userLocationMarker = null;
        let userLocation= null;

        if(this.state.userLocation){
            userLocation = {latitude:this.state.userLocation.coords.latitude,
                            longitude:this.state.userLocation.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421};
            userLocationMarker = <MapView.Marker coordinate= {userLocation}/>

            console.log(userLocation);
        }

        return(
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 39.172975,
                        longitude: -86.52297,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region = {userLocation}>
                    {userLocationMarker}
                </MapView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mapContainer: {
        width:'100%',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    tooltipView:{
        padding: 10,
        backgroundColor:"#fff"
    },
});


export default UsersMap;