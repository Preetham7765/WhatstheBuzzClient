import React, {Component} from 'react';
import {Button, TextInput, View, KeyboardAvoidingView, Text, Alert} from "react-native";
import styles from './Styles'
import Styles from "../Login/Styles";
import SERVER_URL from "../../constants/Config";

class EnterpriseRegister extends React.Component{

    static navigationOptions = {
        title: "Whats the Buzz!",
        headerTitleStyle: { textAlign: "center", alignSelf: "center", flex: 1 },
        headerStyle: {
            backgroundColor: "#ecf0f1"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email:"",
            username: "",
            password:""
        };
    }

    onRequest(){

        const {firstname, lastname, email, username, password } = this.state;

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        fetch(`${SERVER_URL}/api/users/enterprise`, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            if (response.status === 200) {
                this.props.navigation.navigate("Login");
                Alert.alert("Request successful. Check your email for followup");
            } else {
                Alert.alert("Request unsuccessful");
            }
        })

    }

    render(){
        return(
            <KeyboardAvoidingView style={Styles.container} behavior={"padding"}>
                <View style={Styles.inputContainer}>
                    <Text style={{padding: 10, fontSize : 15}}>
                        Using Enterprise Subscription you can post events as well as buzzes for more amount of time with no limit restrictions
                    </Text>
                    <TextInput
                        value={this.state.firstname}
                        onChangeText={firstname => this.setState({ firstname })}
                        placeholder={"First Name"}
                        style={Styles.input}
                        underlineColorAndroid="transparent"
                        autoCapitalize="sentences"
                    />
                    <TextInput
                        value={this.state.lastname}
                        onChangeText={lastname => this.setState({ lastname })}
                        placeholder={"Last Name"}
                        underlineColorAndroid="transparent"
                        style={Styles.input}
                        autoCapitalize="sentences"
                    />
                    <TextInput
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder={"Email"}
                        underlineColorAndroid="transparent"
                        style={Styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                        placeholder={"Username"}
                        underlineColorAndroid="transparent"
                        style={Styles.input}
                        autoCapitalize="none"
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder={"Password"}
                        underlineColorAndroid="transparent"
                        style={Styles.input}
                        secureTextEntry={true}
                    />
                    <View style={{ flexDirection: "column", width: "85%", padding: 10 }}>
                        <Button
                            title={"Request Access"}
                            color="#841584"
                            onPress={this.onRequest.bind(this)}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default EnterpriseRegister;