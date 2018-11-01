import React from 'react';
import {View} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Styles from './Styles';

const mapScreen = (props) => {

    let userLocationMarker = null;
    let userLocation= null;

    if(props.userLocation){
        userLocation = {latitude:props.userLocation.coords.latitude,
                        longitude:props.userLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421};
        userLocationMarker = <MapView.Marker coordinate= {userLocation}/>
        console.log(userLocation);
    }

    return(
        <View style={Styles.mapContainer}>
            <MapView
                style={Styles.map}
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

export default mapScreen;