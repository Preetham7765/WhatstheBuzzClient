import React from 'react';
import { View } from 'react-native';
import UsersMap from './UsersMap';
import Login from './Login';

class Layout extends React.Component {

    state = {
        userLoggedIn: false,  
    }

    createNewTopic = (userLocation, refreshMap) => {
        console.log("Creating new topic ", userLocation);
        this.props.navigation.navigate('NewTopic', {'userLocation': userLocation, 'refresh': refreshMap});
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

export default Layout;