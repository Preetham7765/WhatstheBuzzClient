import React from 'react';
import { View, Button} from 'react-native';
import Styles, { formStyles} from './Styles';
import t from 'tcomb-form-native';
import Moment from 'moment';

// create an onsubmit handler 

// we need to current location of the user to be sent
// this should come from the props

const Form = t.form.Form;
const Topic = t.struct({
        title: t.String,
        date: t.Date,
        fromTime: t.Date,
        toTime: t.Date,
        description: t.maybe(t.String)
});
let formatDate = (date) =>{
    return Moment(date).format('LL');
}
let formatTime = (time) =>{
    return Moment(time).format('LT');
}
const options = {
    fields: {
        title: {
        error: 'Please provide a title for the new Topic'
        },
        date: {
            mode: 'date', // display the Date field as a DatePickerAndroid
            config:{
                format:(date) => formatDate(date),
                defaultValueText: "Tap here to select Date"
            }
        },
        fromTime: {
            mode: 'time', // display the Date field as a DatePickerAndroid
            config:{
                format:(time) => formatTime(time),
                defaultValueText: "Tap here to select event start time"
            }
        },
        toTime: {
            mode: 'time', // display the Date field as a DatePickerAndroid
            config:{
                format:(time) => formatTime(time),
                defaultValueText: "Tap here to select event end time"
            }
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
                            height: 150
                        },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }
        }
    },
    stylesheet: formStyles,
};

class NewTopicScreen extends React.Component {

    state = {

        author: 'Preetham',
        value: {
            title: '',
            description: ''
        },
        userLocation: null,
        //isDateTimePickerVisible: false,
    }

    createTopicHandler = () => {
        let value = this._form.getValue();
        if(value){
            console.log("Creating new topic");
            // send data to server

            //navigate to maps page
        }
    }

    onChangeHandler = (value) => {
        this.setState({value});

    }
    render() {
        return (
            <View style= {Styles.container}>
                <Form
                    //style={{flex: 1, flexDirection: 'row'}}
                    ref= {(f) => this._form = f}
                    type = {Topic }
                    options = {options }
                    value = {this.state.value}
                    onChange = {this.onChangeHandler}

                />
                <Button title = "Create New Topic" onPress = {this.createTopicHandler} />
            </View>
        );
    }
}

export default NewTopicScreen;