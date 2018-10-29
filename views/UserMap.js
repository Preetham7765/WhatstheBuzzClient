import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout }from 'react-native-maps';

var markers = [
    {
        latitude: 45.65,
        longitude: -78.90,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
    }
];

const usersMap = props => {
    return(
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}

                initialRegion={{
                    latitude: 39.172975,
                    longitude: -86.52297,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    coordinate={{
                        latitude: 39.172975,
                        longitude: -86.52297,
                        title: 'Luddy Hall',
                        subtitle: 'You are at 700 N Woodlawn Ave',}}>
                    <Callout tooltip>
                        <View style={styles.tooltipView}>
                            <Text>You are at Luddy Hall</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
        </View>
    );
};

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