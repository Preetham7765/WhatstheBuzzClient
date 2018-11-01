import React from 'react';
import { View } from 'react-native';
import UsersMap from './UsersMap';

class Layout extends React.Component {

    createNewTopic = () => {
        console.log("Creating new topic");
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