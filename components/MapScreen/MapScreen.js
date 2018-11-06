import React from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, Callout } from 'react-native-maps';
import Styles from './Styles';

const mapScreen = (props) => {

    let userLocation= null;
    let topicMarkers = [];
    if(props.userLocation){
        userLocation = {latitude:props.userLocation.coords.latitude,
                        longitude:props.userLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421};
    }

    if(props.topicData.length > 0){
        console.log(props.topicData);
        topicMarkers = props.topicData.map((object, i)=>{

            let topicCordinates = {  latitude: parseFloat(object.location[0]),
                                    longitude:  parseFloat(object.location[1])
                                };

            return (<Marker coordinate={topicCordinates} key={i}>
                    <Callout tooltip>
                        <View style={Styles.tooltipView}>
                            <Text>{object.title}</Text>
                        </View>
                </Callout>
            </Marker>);
        });
    }

    return(
        <View style={Styles.mapContainer}>
            <MapView
                clustering = {true}
                style={Styles.map}
                initialRegion={userLocation}
                region = {userLocation}
                showsUserLocation={true}>
                {topicMarkers}
            </MapView>
        </View>
    );
}


export default mapScreen;