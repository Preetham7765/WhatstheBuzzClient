import React, { Component } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text } from "react-native";

class Register extends React.Component {
  static navigationOptions = {
    title: "Whats the Buzz!",
    headerTitleStyle: { textAlign: "center", alignSelf: "center", flex: 1 },
    headerStyle: {
      backgroundColor: "#ecf0f1"
    }
  };

  validate(firstName, lastName, username, password) {
    // true means invalid, so our conditions got reversed
    return {
      firstName: firstName.length > 0,
      lastName: lastName.length > 0,
      username: username.length > 0,
      password: password.length > 0
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
      //confirmPassword:'',
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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder={"First Name"}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder={"Last Name"}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            placeholder={"Username"}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={styles.input}
          />
          <TextInput
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={styles.input}
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
    //Alert.alert('hi');
    if (password !== confirmPassword) {
      Alert.alert("Password and Confirm Password do not match");
    } else {
      console.log("Registering new user");
      // send data to server
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      };
      console.log("Registering new user1", newUser);

      fetch("http://192.168.43.200:5000/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
        .then(response => console.log(response.status))
        .then(() => {
          Alert.alert("Registration successful. Log in to start buzzing!");
          this.props.navigation.navigate("Login");
        })
        .catch(function(error) {
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
    backgroundColor: "#ecf0f1",
    width: "100%"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: 'center',
    backgroundColor: "#ecf0f1",
    width: "100%"
  },
  input: {
    width: "80%",
    margin: 15,
    height: 40,
    padding: 10,
    //borderColor: '#7a42f4',
    borderWidth: 1
  },

  statusBar: {
    height: 24
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    height: 56,
    flex: 1
  }
});
