import React from 'react';
import {View, Text, StyleSheet,Button, Dimensions} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';

import Styles from './Styles';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let buttonSize = 40;
let viewWidth = 100;
let viewHeight = height/10*9; // large enough to hold all buttons


export default class PlusButton extends React.Component{
	constructor(props){
        super(props);

    }
    
    render(){
        //props should include functions for these buttons
        return(
                <ActionButton buttonColor = 'blue' position = 'right' size = {buttonSize}>
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="Add Comment"
                        onPress={() => this.props.showCommentWindow()}> 
                        <Icon name="create" color = 'white'/>
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Information"
                        onPress={this.function1}>
                        <Icon name="info" color = 'white'/>
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#1abc9c"
                        title="other functions"
                        onPress={this.function1}>
                        <Icon name="build" color = 'white'/>
                    </ActionButton.Item>
                </ActionButton>
        );
    }

    function2 = () => {
        alert("function 2 runs");
    }
}