import React from "react";
import { Alert, Button, TextInput, View } from "react-native";
import Styles from './Styles';

import { SERVER_URL } from '../../constants/Config';

class Register extends React.Component {
  static navigationOptions = {
    title: "Whats the Buzz!",
    headerTitleStyle: { textAlign: "center", alignSelf: "center", flex: 1 },
    headerStyle: {
      backgroundColor: "#ecf0f1"
    }
  };

  validate(firstName, lastName, username, email, password) {
    // true means invalid, so our conditions got reversed
    return {
      firstName: firstName.length > 0,
      lastName: lastName.length > 0,
      username: username.length > 0,
      email: email.length > 0,
      password: password.length > 0
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      firstName,
      lastName,
      username,
      password,
      confirmPassword
    } = this.state;
    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      username.length > 0 &&
      password.length > 0 &&
      password === confirmPassword > 0;
    return (
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <TextInput
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName: firstName })}
            placeholder={"First Name"}
            style={Styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName: lastName })}
            placeholder={"Last Name"}
            style={Styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.username}
            onChangeText={username => this.setState({ username: username })}
            placeholder={"Username"}
            style={Styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email: email })}
            placeholder={"email"}
            underlineColorAndroid="transparent"
            style={Styles.input}
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password: password })}
            placeholder={"Password"}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={Styles.input}
          />
          <TextInput
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword: confirmPassword })}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={Styles.input}
          />
          <View style={{ flexDirection: "column", width: "85%", padding: 10 }}>
            <Button
              disabled={!this.validate.bind(this)}
              title={"Sign Up"}
              color="#841584"
              onPress={this.onRegister.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }

  onRegister() {
    const {
      firstName,
      lastName,
      username,
      password,
      confirmPassword
    } = this.state;

    if (password !== confirmPassword) {
      Alert.alert("Password and Confirm Password do not match");
    } else {
      console.log("Registering new user");
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email, 
        password: this.state.password
      };
      console.log("Registering new user1", newUser);

      fetch(`${SERVER_URL}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            Alert.alert("Registration successful. Log in to start buzzing!");
            this.props.navigation.navigate("Login");
          }
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
  }
}

export default Register;