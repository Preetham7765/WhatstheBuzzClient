import React from 'react';
import { Button, TextInput, View, KeyboardAvoidingView, Text, Alert } from "react-native";
import Styles from './Styles'
import { SERVER_URL } from "../../constants/Config";

class EnterpriseRegister extends React.Component {

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
            email: "",
            username: "",
            password: ""
        };
    }

    onRequest() {

        const { firstname, lastname, email, username, password } = this.state;

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        const url = `${SERVER_URL}/api/users/enterprise`;
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                Alert.alert("Request successful. Check your email for followup");
                this.props.navigation.navigate("Login");
            } else {
                Alert.alert("Request unsuccessful");
            }
        }).catch(err => console.log(err));

    }

    render() {
        return (
            <KeyboardAvoidingView style={Styles.container} behavior={"padding"}>
                <View style={Styles.inputContainer}>
                    <Text style={{ padding: 10, fontSize: 15 }}>
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