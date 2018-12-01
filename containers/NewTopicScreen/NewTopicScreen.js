import React from 'react';
import { Button, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Styles, { formStyles } from './Styles';
import t from 'tcomb-form-native';


import { SERVER_URL } from '../../constants/Config';
// create an onsubmit handler 

// we need to current location of the user to be sent
// this should come from the props

const Form = t.form.Form;

const topicTypes = t.enums({
    'Buzz': 'Buzz',
    'Event': 'Event'
}, 'Type');

const activeDuration = t.enums({
    30: '30 minutes',
    60: '60 minutes',
    90: '90 minutes',
    120: '120 minutes',

}, 'Duration');

var options = {

    fields: {
        title: {
            error: 'Please provide a title for the new Topic'
        },
        description: {
            multiline: true,
            numberofLines: 4,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 150,
                        textAlignVertical: 'top',
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }
        },
        topicType: {
            label: 'What would you like to create?'
        },
        duration: {
            label: 'Select a duration',
        },
        startTime: {
            minimumDate: new Date(),
        }
    },
    stylesheet: formStyles,
};

class NewTopicScreen extends React.Component {

    dimensions = Dimensions.get('window');

    constructor(props) {
        super(props);
        const value = {};
        this.state = {
            author: '',
            value: value,
            topicType: this.getTopicType(value),
            userLocation: null
        };
    }

    createTopicHandler = async () => {
        let value = this._form.getValue();
        const userLocation = this.props.navigation.getParam('userLocation', null);
        if (value !== null && userLocation !== null) {
            // send data to server
            const newTopicData = {
                author: this.state.author,
                title: this.state.value.title,
                description: this.state.value.description,
                duration: this.state.value.duration,
                location: [userLocation.coords.longitude, userLocation.coords.latitude],
                topicType: this.state.value.topicType,
                startAt: this.state.value.startTime,
                expireAt: this.state.value.endTime
            }

            console.log("newTopicData", newTopicData);
            let token = '';
            try {
                token = await AsyncStorage.getItem('token');
            }
            catch (error) {
                console.log("NewTopicScreen: Failed to get token", error);
                return;
            }

            fetch(`${SERVER_URL}/api/topics`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Authorization': token
                },
                body: JSON.stringify(newTopicData)
            })
                .then((response) => {
                    console.log("Response from server ", response)
                })
                .catch((error) => {
                    console.log(error)
                });

            this.props.navigation.navigate('Main');
            //navigate to maps page
        }
    }

    getTopicType(value) {
        if (value.topicType === 'Event') {
            console.log("in event topictype");
            return t.struct({
                title: t.String,
                description: t.maybe(t.String),
                topicType: topicTypes,
                startTime: t.Date,
                endTime: t.Date
            });
        }
        else {
            return t.struct({
                title: t.String,
                description: t.maybe(t.String),
                topicType: topicTypes,
                duration: activeDuration,
            });
        }
    }

    onChangeHandler = (value) => {
        const topicType = value.topicTypes !== this.state.value.topicType ? this.getTopicType(value) : this.state.topicType;
        this.setState({ value, topicType });
    }

    componentWillUnmount = () => {
        //    const refresh = this.props.navigation.getParam('refresh', null);
        //    console.log(refresh);
        //    refresh();
    }

    async componentDidMount() {
        if (this.state.author == '') {
            try {
                const authorId = await AsyncStorage.getItem('userId');
                this.setState({ author: authorId });
            }
            catch (error) {
                console.log("NewTopicScreen: failed to get author id", error);
            }
        }
    }

    render() {

        return (
            <ScrollView style={Styles.container}>
                <Form
                    ref={(f) => this._form = f}
                    type={this.state.topicType}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChangeHandler}
                    style={{ flex: 1 }} />
                <Button title="Create New Post" onPress={this.createTopicHandler} />
                <KeyboardSpacer />
            </ScrollView>

        );
    }
}

export default NewTopicScreen;