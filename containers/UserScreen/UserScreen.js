import React from "react";
import { Image, ScrollView, View, AsyncStorage } from "react-native";
import {
  Accordion,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail
} from "native-base";
import * as Progress from "react-native-progress";
import { deleteUser, getUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./Styles";
import FreeBuzz from "../FreeBuzz/FreeBuzz";
import { SERVER_URL } from "../../constants/Config";
import { calcLevel } from "../../services/Level";
import { AppLoading, Font } from "expo";

class UserScreen extends React.Component {
  constructor() {
    super();

    //this.getUserInfo();
    this.state = {
      fontLoaded: false,
      level: 3,
      user: {
        id: "",
        checkins: 0,
        buzzes: 6,
        upvotes: 10,
        firstName: "",
        reputationScore: null
      },
      progress: 0.5
    };
  }

  async componentWillMount() {
    // This is used to overcome the Font error thrown with android
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log("error loading icon fonts", error);
    }
  }

  // Grab User data
  async componentDidMount() {
    // this.props.getUser(this.user.id);
    if (this.state.user.id === "") {
      let token = "";
      let userId = "";
      try {
        userId = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("token");
      } catch (error) {
        console.log("UserScreen: failed to get userId/token", error);
      }
      const url = `${SERVER_URL}/api/users/${userId}`;
      let response = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: token
        }
      });

      let respJson = await response.json();
      console.log(respJson);
      this.setState({ user: { ...respJson } });
    }
  }

  getDataArray = () => {
    return [
      {
        title: "Show More",
        content: (
          <List>
            <ListItem>
              <Thumbnail
                size={10}
                source={require("../../assets/images/buzz3.png")}
              />
              <Text>Buzzes</Text>
              <Text>{this.state.user.buzzes}</Text>
            </ListItem>
            <ListItem>
              <MaterialCommunityIcons
                name="marker-check"
                size={32}
                color="green"
              />
              <Text>Check-ins</Text>
              <Text>{this.state.user.checkins}</Text>
            </ListItem>
            <ListItem>
              <Entypo name="thumbs-up" size={32} color="yellow" />
              <Text>Up Votes</Text>
              <Text>{this.state.user.upvotes}</Text>
            </ListItem>
          </List>
        )
      }
    ];
  };

  static navigationOptions = {
    title: "Profile"
  };

  render() {
    if (!this.state.fontLoaded && this.state.user.reputationScore === null) {
      return <AppLoading />;
    }

    console.log(
      this.state.user.firstName + " - rep : " + this.state.user.reputationScore
    );
    console.log(calcLevel(this.state.user.reputationScore));
    let result = [0, 0]; //calcLevel(this.props.user.reputationScore);
    const level = result[0];
    const prog = result[1];
    return (
      <ScrollView style={styles.container}>
        <Container>
          <Content>
            <Card
              style={[
                styles.card,
                this.state.user.enterprise ? styles.enterprise : styles.normal
              ]}
            >
              <CardItem button onPress={() => this.onLogout()}>
                <Text>Logout</Text>
              </CardItem>
              <CardItem>
                <Image
                  source={{
                    uri:
                      "http://nbww.com/wp-content/uploads/2016/06/fot-static-promo-0608.jpg"
                  }}
                  style={{ height: 100, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem cardBody>
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        "https://image.flaticon.com/icons/png/512/206/206879.png"
                    }}
                  />
                  <MaterialCommunityIcons
                    name="marker-check"
                    size={32}
                    color="green"
                  />
                  <Body>
                    <Text>
                      {this.state.user.firstName} {this.state.user.lastName}
                    </Text>
                    <Text note>Level {level}</Text>
                  </Body>
                </Left>
                <Body>
                  <View style={styles.container}>
                    <Progress.Bar progress={prog} width={100} />
                  </View>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Thumbnail
                      source={require("../../assets/images/buzz3.png")}
                    />
                    <Text>2 Buzzes</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Content padder>
                  <Accordion
                    dataArray={this.getDataArray()}
                    expandedIcon="add"
                  />
                </Content>
              </CardItem>
              <CardItem>
                <FreeBuzz progress={0.6} />
              </CardItem>
            </Card>
          </Content>
        </Container>
      </ScrollView>
    );
  }

  static getLevel(reputationScore) {
    return reputationScore > 0 ? Math.round(Math.log(reputationScore)) : 0;
  }

  onLogout() {
    console.log("in logout");
    fetch(`${SERVER_URL}/api/users/logout`, {
      method: "GET",
      //mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      //body: JSON.stringify(user)
    })
      //.then(response => console.log(response.json()))
      .then(res => {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("userId");
        this.props.navigation.navigate("Login");
        console.log("Logged out");
      })
      .catch(function(error) {
        //console.log(user);
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  }
}

UserScreen.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser, deleteUser }
)(UserScreen);
