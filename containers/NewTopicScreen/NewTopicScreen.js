import React from 'react';
import {Button, Dimensions, ScrollView} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Styles, {formStyles} from './Styles';
import t from 'tcomb-form-native';


import {SERVER_URL} from '../../constants/Config';
// create an onsubmit handler 

// we need to current location of the user to be sent
// this should come from the props

const Form = t.form.Form;

const activeDuration = t.enums({
    30: '30 minutes',
    60: '60 minutes',
    90: '90 minutes',
    120: '120 minutes',

}, 'Duration');
var eventType = null;
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

    constructor(props){
        super(props);
        const value = {};
        this.state ={
            author : global.currentUserId,
            value : value,
            topicType : this.getTopicType(),
            userLocation : null
        };
    }

    createTopicHandler = () => {
        let value = this._form.getValue();
        const userLocation = this.props.navigation.getParam('userLocation', null);
        console.log(userLocation);
        if (value !== null && userLocation !== null) {
            // send data to server
            const newTopicData = {
                author: this.state.author,
                title: this.state.value.title,
                description: this.state.value.description,
                duration: this.state.value.duration,
                location: [userLocation.coords.longitude, userLocation.coords.latitude],
                topicType: eventType,
                startAt: this.state.value.startTime,
                expireAt: this.state.value.endTime
            }

            console.log("newTopicData", newTopicData);

            fetch(`${SERVER_URL}/api/topics`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
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

    getTopicType() {
        if(global.enterprise &&  global.enterpriseActive !== "pending"){
            eventType = 'Event';
            return t.struct({
                title: t.String,
                description: t.maybe(t.String),
                startTime: t.Date,
                endTime: t.Date,
            });
        }
        else {
            eventType = 'Buzz';
            return t.struct({
                title: t.String,
                description: t.maybe(t.String),
                duration: activeDuration,
            });
        }
    }

    onChangeHandler = (value) => {
        this.setState({value});
    }

    componentWillUnmount = () => {
        //    const refresh = this.props.navigation.getParam('refresh', null);
        //    console.log(refresh);
        //    refresh();
    }

    render() {

        return (
            <ScrollView style={Styles.container}>
                <Form
                    ref={(f) => this._form = f}
                    type={this.getTopicType()}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChangeHandler}
                    style={{flex: 1}}/>
                <Button title="Create New Post" onPress={this.createTopicHandler}/>
                <KeyboardSpacer/>
            </ScrollView>

        );
    }
}

export default NewTopicScreen;