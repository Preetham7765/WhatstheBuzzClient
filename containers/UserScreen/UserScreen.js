import React from "react";
import {Image, ScrollView, View, AsyncStorage, RefreshControl} from "react-native";
import {
    Accordion, Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    Thumbnail, Separator
} from "native-base";
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import * as Progress from "react-native-progress";
import {deleteUser, getUser, getRep} from "../../actions/userActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import styles from "./Styles";
import FreeBuzz from "../FreeBuzz/FreeBuzz";
import {PROD_URL, SERVER_URL} from "../../constants/Config";
import {calcLevel} from "../../services/Level";
import {AppLoading, Font} from "expo";
import {NavigationEvents} from "react-navigation";


class UserScreen extends React.Component {
    constructor() {
        super();

        //this.getUserInfo();
        this.state = {
            refreshing: false,
            fontLoaded: false,
        };
    }

    async componentWillMount() {
        console.log("Mounting");
        // This is used to overcome the Font error thrown with android
        try {
            await Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            });
            this.setState({fontLoaded: true});
        } catch (error) {
            console.log("error loading icon fonts", error);
        }
        this.fetchData().then(() => {
            console.log(this.state.reputation.upVots);
        });
        // if (typeof this.state.user === "undefined") {
        //     let token = "";
        //     let userId = "";
        //     try {
        //         userId = await AsyncStorage.getItem("userId");
        //         token = await AsyncStorage.getItem("token");
        //     } catch (error) {
        //         console.log("UserScreen: failed to get userId/token", error);
        //     }
        //     const url = `${PROD_URL}/api/users/${userId}`;
        //     let response = await fetch(url, {
        //         headers: {
        //             Accept: "application/json",
        //             Authorization: token
        //         }
        //     });
        //
        //     let respJson = await response.json();
        //     const urlRep = `${PROD_URL}/api/reputation/${respJson.reputation}`;
        //     let responseRep = await fetch(urlRep, {
        //         headers: {
        //             Accept: "application/json",
        //             Authorization: token
        //         }
        //     });
        //     let respJsonRep = await responseRep.json();
        //     console.log(respJsonRep);
        //     this.setState({user: {...respJson}, reputation: {...respJsonRep}});
        // }
    }

    componentWillReceiveProps() {
        console.log('rerender here')
        //this.yourFunction()
        //this.setState({})
    }

    // Grab User data
    async componentDidMount() {
        // this.props.getUser(this.user.id);

    }

    checkFreeBuzz() {
        console.log("Enter buzz");
        // Check free buzz
        let ONE_DAY = 24 * 60 * 60 * 1000;
        /* ms */
        let message = '';
        let endDate = new Date().setHours(24, 0, 0, 0);
        let dif = endDate - Date.now();
        let sinceLast = endDate - this.state.user.lastFree;
        let progress = 0.0;
        if (this.state.user.freeBuzz === 0 && sinceLast < ONE_DAY) {
            message = 'Next Free Buzz in ' + this.parseMilliseconds(dif);
            progress = dif / ONE_DAY;
        } else if (this.state.user.freeBuzz === 1) {
            message = 'Free Buzz Expiring in ' + this.parseMilliseconds(dif);
            progress = dif / ONE_DAY;
        }
        console.log(message + " : " + progress);
        this.setState({progress: progress, message: message});
    }

    static navigationOptions = {
        title: "Profile"
    };

    parseMilliseconds(milliseconds) {
        //Get hours from milliseconds
        let hours = milliseconds / (1000 * 60 * 60);
        let absoluteHours = Math.floor(hours);
        let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

        //Get remainder from hours and convert to minutes
        let minutes = (hours - absoluteHours) * 60;
        let absoluteMinutes = Math.floor(minutes);
        let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

        //Get remainder from minutes and convert to seconds
        let seconds = (minutes - absoluteMinutes) * 60;
        let absoluteSeconds = Math.floor(seconds);
        let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


        return h + ':' + m + ':' + s;
    }

    async fetchData() {
        console.log('refresh');
        let token = "";
        let userId = "";
        try {
            userId = await AsyncStorage.getItem("userId");
            token = await AsyncStorage.getItem("token");
        } catch (error) {
            console.log("UserScreen: failed to get userId/token", error);
        }
        const url = `${PROD_URL}/api/users/${userId}`;
        let response = await fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: token
            }
        });

        let respJson = await response.json();
        const urlRep = `${PROD_URL}/api/reputation/${respJson.reputation}`;
        let responseRep = await fetch(urlRep, {
            headers: {
                Accept: "application/json",
                Authorization: token
            }
        });
        let respJsonRep = await responseRep.json();
        console.log(respJsonRep);
        this.setState({user: {...respJson}, reputation: {...respJsonRep}});
        this.checkFreeBuzz();
    };

    _onRefresh = () => {
        console.log("refreshing");
        this.setState({refreshing: true});
        this.fetchData().then(() => {
            this.setState({refreshing: false});
        });
    };

    _refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh()}/>
        )
    }

    render() {
        console.log("enter render" + this.state);
        if (!this.state.fontLoaded || typeof this.state.user === 'undefined') {
            return <AppLoading/>;
        }
        console.log(calcLevel(this.state.user.reputationScore));
        let result = calcLevel(this.state.user.reputationScore);
        const level = result[0];
        const {user} = this.state.user;
        const prog = result[1];
        return (
            <ScrollView
                style={styles.container}
                refreshControl={this._refreshControl()}
            >
                <Container>
                    <Content>
                        <Card
                            style={[
                                styles.card,
                                this.state.user.enterprise ? styles.enterprise : styles.normal
                            ]}
                        >
                            <CardItem>
                                <Button bordered onPress={() => this.onLogout()}>
                                    <Text>Logout</Text>
                                </Button>
                            </CardItem>
                            <CardItem>
                                <Image
                                    source={{
                                        uri:
                                            "http://nbww.com/wp-content/uploads/2016/06/fot-static-promo-0608.jpg"
                                    }}
                                    style={{height: 100, width: null, flex: 1}}
                                />
                            </CardItem>
                            <CardItem cardBody>
                                <Left>
                                    <Thumbnail
                                        source={{
                                            uri:
                                                "https://image.flaticon.com/icons/png/512/206/206879.png"
                                        }}
                                        style={{marginLeft: 5}}
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
                                    <Progress.Bar progress={prog} width={175}/>
                                </View>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <MaterialCommunityIcons name="map-marker" size={20} color="yellow"/>
                                        <Text>{this.state.user.posts.length} Posts</Text>
                                    </Button>
                                </Left>
                                <Body>
                                <Button transparent>
                                    <Thumbnail
                                        source={require("../../assets/images/buzz3.png")}
                                    />
                                    <Text>{this.state.user.freeBuzz} Buzzes</Text>
                                </Button>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Collapse>
                                    <CollapseHeader style={{flexDirection: 'row'}}>
                                        <Text style={{alignItems: 'center', color: 'blue'}}> Show More </Text>
                                        <MaterialCommunityIcons
                                            name="arrow-down-drop-circle-outline"
                                            size={20}
                                            color="blue"
                                        />
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <ListItem>
                                            <Thumbnail
                                                size={10}
                                                source={require("../../assets/images/buzz3.png")}
                                            />
                                            <Text> Buzzes</Text>
                                            <Text>    {this.state.user.buzzes + this.state.reputation.buzzes}</Text>
                                        </ListItem>
                                        <ListItem>
                                            <MaterialCommunityIcons
                                                name="marker-check"
                                                size={32}
                                                color="green"
                                            />
                                            <Text> Check-ins</Text>
                                            <Text>    {this.state.reputation.checkIns}</Text>
                                        </ListItem>
                                        <ListItem>
                                            <Entypo name="thumbs-up" size={32} color="yellow"/>
                                            <Text> Up Votes</Text>
                                            <Text>    {this.state.reputation.upVotes}</Text>
                                        </ListItem>
                                    </CollapseBody>
                                </Collapse>
                            </CardItem>
                            <CardItem>
                                <FreeBuzz progress={this.state.progress} message={this.state.message}/>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </ScrollView>
        );
    }

    onLogout() {
        console.log("in logout");
        fetch(`${PROD_URL}/api/users/logout`, {
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
            .catch(function (error) {
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
    {getUser, deleteUser, getRep}
)(UserScreen);
