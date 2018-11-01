import React from 'react';
import { View, Text } from 'react-native';

const errorScreen = (props) => {

    return (
        <View>
            <Text>{props.errorMessage}</Text>
        </View>
    );
} 

export default errorScreen;