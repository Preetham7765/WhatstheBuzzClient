import React, { Component } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text } from "react-native";
import ActionBar from "react-native-action-bar";

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

    fetch("http://192.168.43.200:5000/api/users/login", {
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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
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
          <View style={{ flexDirection: "column", width: "85%", padding: 10 }}>
            <Button
              title={"Login"}
              color="#841584"
              onPress={this.onLogin.bind(this)}
            />
          </View>
          <Text style={styles.titleText}>{"OR"}</Text>
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
      </View>
    );
  }
}

export default Login;
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
    justifyContent: "center",
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
