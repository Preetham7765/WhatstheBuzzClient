import React from 'react';
import { View } from 'react-native';
import UsersMap from './UsersMap';
import Login from './Login';

class Layout extends React.Component {

    state = {
        userLoggedIn: false,
    }

    createNewTopic = (userLocation) => {
        console.log("Creating new topic ", userLocation);
        this.props.navigation.navigate('NewTopic');
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
                {/*<UsersMap newTopic = {this.createNewTopic}/>*/}
               <Login login = {this.login}/>
            </View>);
    }
}

export default Layout;