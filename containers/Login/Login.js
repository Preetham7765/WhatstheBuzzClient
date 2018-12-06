import React from "react";
import {Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage} from "react-native";
import Styles from './Styles';

import {SERVER_URL, PROD_URL, ANDROID_CLIENT_ID, IOS_CLIENT_ID} from '../../constants/Config';

class Login extends React.Component {
    static navigationOptions = {
        title: "Whats the Buzz!",
        headerTitleStyle: {textAlign: "center", alignSelf: "center", flex: 1},
        headerStyle: {
            backgroundColor: "#ecf0f1"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    componentDidMount() {
        // console.log("Already Logged in", AsyncStorage.getItem('userId'));
        //  this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        // const userId = await AsyncStorage.getItem('userId');
        // if (userId !== null) {
        //     this.props.navigation.navigate('Main');
        // }
    }
    signIn = async () => {
        try {
            console.log(ANDROID_CLIENT_ID);
            const result = await Expo.Google.logInAsync({
                androidClientId: ANDROID_CLIENT_ID,
                iosClientId: IOS_CLIENT_ID,
                scopes: ["profile", "email"]
            })
            if (result.type === "success") {
                console.log(result);
                global.currentUser = result.user.email;
                // Alert.alert("Welcome, ", global.currentUser);
                this.setState({
                    signedIn: true,
                    username: result.user.email,
                    firstName: result.user.givenName,
                    lastName: result.user.familyName,
                    email: result.user.email,
                    signInMode: 'google',
                    //photoUrl: result.user.photoUrl
                });
                this.googleCheckUser();
                this.props.navigation.navigate("Main");
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    googleCheckUser() {
        console.log("Finding if user has already logged in using Google");
        // send data to server
        const user = {
            username: this.state.username,
            signInMode: 'google'
        };
        //console.log("Registering new user1");

        fetch(`${SERVER_URL}/api/users/isUserPresent`, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                console.log(res.status);
                if (res.success === true) {
                    // Alert.alert("User available");
                    AsyncStorage.setItem('userId', res.userId);
                    AsyncStorage.setItem('username', res.username);
                    this.props.navigation.navigate("Main");
                } else {
                    this.googleSignUp();
                }
            })
            .catch(function (error) {
                console.log(user);
                console.log(
                    "There has been a problem with your fetch operation: " + error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    }

    googleSignUp() {
        console.log("Registering new user");
        // send data to server
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            signInMode: 'google',
        };
        console.log("Registering new user1", newUser);

        fetch(`${SERVER_URL}/api/users/googleSignUp`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        //.then(response => console.log(response.status))
            .then((res) => {
                //Alert.alert("Registration successful. Log in to start buzzing!");
                AsyncStorage.setItem('userId', res.userId);
                AsyncStorage.setItem('username', res.username);
                //this.props.navigation.navigate("Login");
            })
            .catch(function (error) {
                console.log(newUser);
                console.log(
                    "There has been a problem with your fetch operation: " +
                    error.message
                );
                // ADD THIS THROW error
                throw error;
            });
    }

    onLogin() {
        const {username, password} = this.state;

        console.log("Finding user");
        // send data to server
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        //console.log("Registering new user1");
        fetch(`${SERVER_URL}/api/users/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then(res => {
                if (res.success === true) {
                    AsyncStorage.setItem('token', res.token);
                    AsyncStorage.setItem('userId', res.data.userId);
                    AsyncStorage.setItem('enterpriseActive', res.data.enterpriseActive.toString());
                    AsyncStorage.setItem('enterprise', res.data.enterprise.toString());
                    AsyncStorage.getAllKeys()
                        .then(data => {
                            console.log("printing all storage contents", data);
                        });
                    this.props.navigation.navigate("Main");
                }
                else Alert.alert("Login unsuccessful");

            })
            .catch(function (error) {
                console.log(user);
                console.log(
                    "There has been a problem with your fetch operation: " + error.message
                );
                // ADD THIS THROW error
                throw error;
            })
    }

    render() {
        const {navigate} = this.props.navigation;
        const {username, password} = this.state;
        return (
            <View style={Styles.container}>

                <View style={Styles.inputContainer}>
                    <TextInput
                        value={this.state.username}
                        onChangeText={username => this.setState({username})}
                        placeholder={"Username"}
                        style={Styles.input}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        style={Styles.input}
                    />
                    <View style={{flexDirection: "column", width: "85%", padding: 10}}>
                        <Button
                            title={"Login"}
                            color="#841584"
                            onPress={this.onLogin.bind(this)}
                        />
                    </View>
                    <Text style={Styles.titleText}>{"OR"}</Text>
                    <View style={{flexDirection: "column", width: "85%", padding: 10}}>
                        <Button
                            title={"Register"}
                            color="#841584"
                            //onPress={this.onLogin.bind(this)}
                            onPress={() => navigate("Register")}
                            // onPress={() => this.onRegister.bind(this)}
                        />
                    </View>
                </View>
                <View style={{flexDirection: "column", width: "85%", padding: 10}}>
                    <Button
                        title={"Enterprise Register"}
                        color="#841584"
                        onPress={() => navigate("EnterpriseRegister")}
                    />
                </View>
                <View style={{flexDirection: "column", width: "70%", padding: 10}}>
                    <Button
                        title={"Login with Google"}
                        color="#4285F4"
                        onPress={this.signIn}
                    />
                </View>
            </View>
        );
    }
}

export default Login;