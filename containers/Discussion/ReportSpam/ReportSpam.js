import React from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles';

export default class SpamButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spamNum: props.spamNum, spam: props.spam, text: "Report Spam" };
    }

    render() {
        return (
            <View style={Styles.container}>
                <TouchableHighlight
                    activeOpacity={1}
                    style={
                        this.state.spam
                            ? Styles.Selected
                            : Styles.notSelected
                    }
                    onPress={this.toggle}
                >
                    <Icon name="exclamation-triangle" size = {15}>
                    <Text>
                        {this.state.text}
                    </Text>
                    </Icon>
                </TouchableHighlight>
            </View>
        );
    }

    toggle = () => {
        if (this.state.spam) {
            this.setState((states, props) => { return { spam: false, spamNum: states.spamNum - 1, text: "Report Spam" } });
        }
        else {
            this.setState((states, props) => { return { spam: true, spamNum: states.spamNum + 1, text:" It is Spam" } });
        }
    }
}