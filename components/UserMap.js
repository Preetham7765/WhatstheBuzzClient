import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const usersMap = (props) => {

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


export default usersMap;