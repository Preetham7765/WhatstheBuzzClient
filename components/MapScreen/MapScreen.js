import React from 'react';
import {View, Text, Animated} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Styles from './Styles';

const mapScreen = (props) => {

    let userLocationMarker = null;
    let userLocation= null;
    let data = null;
    let topicMarkers = null;
    if(props.userLocation){
        userLocation = {latitude:props.userLocation.coords.latitude,
                        longitude:props.userLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421};
        userLocationMarker =
            <MapView.Marker coordinate= {userLocation}>
                <Animated.View style={[Styles.markerWrap]}>
                    <Animated.View style={[Styles.ring]} />
                    <View style={Styles.marker} />
                </Animated.View>
            </MapView.Marker>
        console.log(userLocation);
    }

    if(props.topicData){
        data = props.topicData;
        topicMarkers = data.map(
            (object, i)=>
                <MapView.Marker coordinate={object} key={i}>
                    <Callout tooltip>
                        <View style={Styles.tooltipView}>
                            <Text>{object.title}</Text>
                        </View>
                    </Callout>

                </MapView.Marker>);

    }

    return(
        <View style={Styles.mapContainer}>
            <MapView
                style={Styles.map}
                initialRegion={userLocation}
                region = {userLocation}>
                {userLocationMarker}
                {topicMarkers}
            </MapView>
        </View>
    );
}


export default mapScreen;