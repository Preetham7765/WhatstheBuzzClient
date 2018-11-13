import React from 'react';
import {View, Text} from 'react-native';
import MapViewCluster from 'react-native-map-clustering';
import MapView , {Callout, Circle } from 'react-native-maps';
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
        
        topicMarkers = props.topicData.map((object, i)=>{
            let topicCordinates = {  latitude: parseFloat(object.loc.coordinates[1]),
                                    longitude:  parseFloat(object.loc.coordinates[0])
                                };

            return (<MapView.Marker coordinate={topicCordinates} key={object._id}>
                    <Callout onPress = {props.onClick} tooltip>
                        <View style={Styles.tooltipView}>
                            <Text>{object.title}</Text>
                        </View>
                </Callout>
            </MapView.Marker>);
        });
    }
    console.log("rendering map", topicMarkers.length);
    return(
        <View style={Styles.mapContainer}>
            <MapView
                clustering = {true}
                style={Styles.map}
                region = {userLocation}
                showsCompass={true}
                showsPointsOfInterest = {false}
                showsUserLocation={true}>
            <Circle 
                center = {userLocation}
                radius = {4000}
                fillColor = { 'rgba(230,238,255,0.5)'}            
                />
                {topicMarkers}
            </MapView>
        </View>
    );
}


export default mapScreen;