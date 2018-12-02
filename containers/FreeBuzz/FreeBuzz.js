import React from 'react';
import {
    ProgressBarAndroid,
    ProgressViewIOS,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Container, List, ListItem, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Accordion } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Styles from "../UserScreen/Styles";


export default class FreeBuzz extends React.Component {
    constructor() {
        super();

        this.state = {
            username: 'Chris',
            level: 3,
            progress: 0.5
        }
    }

    render() {
        return (
            <View>
                <Thumbnail style={{
                    position: 'absolute',
                    width: 100,
                    height: 100
                }} source={require('../../assets/images/buzz3.png')} />

                <Progress.Circle size={100} color={'yellow'} progress={this.props.progress} thickness={6} strokeCap={'round'} />
                <Text>12 hours left til next</Text>
            </View>

        );
    }
}