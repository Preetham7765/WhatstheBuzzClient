import React from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';

import Styles from './Styles';

export default class DuplicateButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { duplicateNum: props.duplicateNum, duplicate: props.duplicate, text: "Mark as duplicate" };
    }

    render() {
        return (
            <View style={Styles.container}>
                <TouchableHighlight
                    activeOpacity={1}
                    style={
                        this.state.duplicate
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
        if (this.state.duplicate) {
            this.setState((states, props) => { return { duplicate: false, duplicateNum: states.duplicateNum - 1, text: "Mark as duplicate" } });
        }
        else {
            this.setState((states, props) => { return { duplicate: true, duplicateNum: states.duplicateNum + 1, text: (states.duplicateNum + 1) + " peoples marked as duplicate" } });
        }
    }
}