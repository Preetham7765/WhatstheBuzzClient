import React from 'react';
import { ScrollView, Button, Dimensions} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Styles, { formStyles} from './Styles';
import t from 'tcomb-form-native';

// create an onsubmit handler 

// we need to current location of the user to be sent
// this should come from the props

const Form = t.form.Form;

const activeDuration = t.enums({
    30 : '30 minutes',
    60 : '60 minutes',
    90 : '90 minutes',
    120: '120 minutes',

}, 'Duration');

const Topic = t.struct({
        title: t.String,
        description: t.maybe(t.String),
        duration: activeDuration 
});

const options = {

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
        duration: {
            label: 'Select a duration'            
        }
    },
    stylesheet: formStyles,
};

class NewTopicScreen extends React.Component {

    dimensions = Dimensions.get('window'); 

    state = {

        author: 'chris',
        value: {
            title: '',
            description: '',
            duration: 30
        },
        userLocation: null,    
    }
    
    createTopicHandler = () => {
        let value = this._form.getValue();
        const userLocation = this.props.navigation.getParam('userLocation', null);
        console.log(userLocation);
        if(value !== null && userLocation !== null){
            // send data to server
            const newTopicData = {
                author: this.state.author,
                title: this.state.value.title,
                description: this.state.value.description,
                duration: this.state.value.duration,
                location: [userLocation.coords.longitude, userLocation.coords.latitude]
            }

            console.log("newTopicData", newTopicData);

            fetch("http://192.168.1.94:5000/api/topics", {
                method:'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(newTopicData)
            })
            .then((response) => {console.log("Response from server ", response)})
            .catch((error) => {console.log(error)});

            this.props.navigation.navigate('Main');
            //navigate to maps page
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
                    ref= {(f) => this._form = f}
                    type = {Topic }
                    options = {options }
                    value = {this.state.value}
                    onChange = {this.onChangeHandler}
                    style = {{flex: 1}}/>
                <Button title = "Create New Post" onPress = {this.createTopicHandler} />
                <KeyboardSpacer/>
            </ScrollView>
            
        );
    }
}

export default NewTopicScreen;