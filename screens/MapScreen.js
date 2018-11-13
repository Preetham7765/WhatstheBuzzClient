import React from 'react';
import {StyleSheet, View } from 'react-native';
import UsersMap from '../containers/UsersMap';
import Login from '../containers/Login';

export default class MapScreen extends React.Component {

    state = {
        userLoggedIn: false,
    }

    createNewTopic = (userLocation) => {
        console.log("Creating new topic ", userLocation);
        this.props.navigation.navigate('NewTopic', {'userLocation': userLocation});
    }

    // TODO: should take buzz id and then fetch content from server 
    showDiscussionWindow = () => {
        console.log("Navigate to discussion window");
        this.props.navigation.navigate('ScreenThread', {});
    }

    /*registerUser = () =>{
        console.log("Register User");
        this.props.navigation.navigate('Register');
    }*/

    login = () =>{
        console.log("Login User");
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
                <UsersMap newTopic = {this.createNewTopic}
                          discussion = {this.showDiscussionWindow}/>
               {/* <Login login = {this.login}/>*/}
            </View>);
    }
}
