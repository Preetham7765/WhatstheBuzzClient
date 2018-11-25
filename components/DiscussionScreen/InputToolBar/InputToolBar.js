import React from 'react';
import Styles from './Styles';
import { TextInput, Button, View } from 'react-native';

const inputToolBar = (props) => {

    return (
        <View style={Styles.container}>
            <TextInput
                style={Styles.textInput}
                onChangeText = {(text)=>props.changed(text)}
                value = {props.value}
                placeholder = "Type here...."
            />
            <Button
                style={Styles.button}
                title="Send"
                color="#841584"
                onPress={props.clicked} />
        </View>
    );

}

export default inputToolBar;