import React from 'react';
import { View } from 'react-native';
import UsersMap from './UsersMap';

class Layout extends React.Component {

    createNewTopic = (userLocation) => {
        console.log("Creating new topic ", userLocation);
        this.props.navigation.navigate('NewTopic');
    }

    render() {
        return (
            <View>
                <UsersMap newTopic = {this.createNewTopic}/>
            </View>);
    }
}

export default Layout;