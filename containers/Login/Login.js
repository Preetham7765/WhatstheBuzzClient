import React, { Component } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text } from "react-native";
import ActionBar from "react-native-action-bar";
import Styles from './Styles';

import SERVER_URL from '../../constants/Config';

class Login extends React.Component {
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
      username: "",
      password: ""
    };
  }
    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId:
                    "680284249418-pnjnbe7di9stdg75nu422ais0ecu0g41.apps.googleusercontent.com",
                iosClientId: "680284249418-jqli8orrn39mklhvc6b73l7nlfmtejap.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
              console.log(result);

                this.setState({
                    signedIn: true,
                    //name: result.user.name,
                    //photoUrl: result.user.photoUrl
                });
                this.props.navigation.navigate("Main");
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
  onLogin() {
    const { username, password } = this.state;

    Alert.alert("Credentials", `${username} + ${password}`);

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
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          Alert.alert("Login successful");
          this.props.navigation.navigate("Main");
        } else Alert.alert("Login unsuccessful");
      })
      .catch(function(error) {
        console.log(user);
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  }

  onRegister() {}

  render() {
    const { navigate } = this.props.navigation;
    const { username, password } = this.state;
    return (
      <View style={Styles.container}>

        <View style={Styles.inputContainer}>
          <TextInput
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            placeholder={"Username"}
            style={Styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={Styles.input}
          />
          <View style={{ flexDirection: "column", width: "85%", padding: 10 }}>
            <Button
              title={"Login"}
              color="#841584"
              onPress={this.onLogin.bind(this)}
            />
          </View>
          <Text style={Styles.titleText}>{"OR"}</Text>
          <View style={{ flexDirection: "column", width: "85%", padding: 10 }}>
            <Button
              title={"Register"}
              color="#841584"
              //onPress={this.onLogin.bind(this)}
              onPress={() => navigate("Register")}
              // onPress={() => this.onRegister.bind(this)}
            />
          </View>
        </View>
          <View style={{ flexDirection: "column", width: "70%", padding: 10 }}>
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