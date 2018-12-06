import React from "react";
import {
  Button,
  TextInput,
  View,
  KeyboardAvoidingView,
  Text,
  Alert,
  ImageBackground
} from "react-native";
import Styles from "./Styles";
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
    };
    const url = `${SERVER_URL}/api/users/enterprise`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          Alert.alert("Request successful. Check your email for followup");
          this.props.navigation.navigate("Login");
        } else {
          Alert.alert("Request unsuccessful");
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/bg2.jpg")}
        imageStyle={{ resizeMode: "cover" }}
        style={Styles.image}
      >
        <KeyboardAvoidingView style={Styles.container} behavior={"padding"}>
          <View style={Styles.inputContainer}>
            <TextInput
              value={this.state.firstname}
              onChangeText={firstname => this.setState({ firstname })}
              placeholder={"First Name"}
              placeholderTextColor="black"
              style={Styles.input}
              underlineColorAndroid="transparent"
              autoCapitalize="sentences"
            />
            <TextInput
              value={this.state.lastname}
              onChangeText={lastname => this.setState({ lastname })}
              placeholder={"Last Name"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              style={Styles.input}
              autoCapitalize="sentences"
            />
            <TextInput
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              placeholder={"Email"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              style={Styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              placeholder={"Username"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              style={Styles.input}
              autoCapitalize="none"
            />
            <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder={"Password"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              style={Styles.input}
              secureTextEntry={true}
            />
            <View
              style={{ flexDirection: "column", width: "85%", padding: 10 }}
            >
              <Button
                title={"Request Access"}
                color="#841584"
                onPress={this.onRequest.bind(this)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default EnterpriseRegister;
