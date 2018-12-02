import React from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';

import Styles from './Styles';

export default class SpamButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spamNum: props.spamNum, spam: props.spam, text: "Mark as spam" };
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
                    onPress={this.taggle}
                >
                    <Text>
                        {this.state.text}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    taggle = () => {
        if (this.state.spam) {
            this.setState((states, props) => { return { spam: false, spamNum: states.spamNum - 1, text: "Mark as spam" } });
        }
        else {
            this.setState((states, props) => { return { spam: true, spamNum: states.spamNum + 1, text: (states.spamNum + 1) + " peoples marked as spam" } });
        }
    }
}