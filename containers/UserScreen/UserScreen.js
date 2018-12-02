import React from 'react';
import { Image, ScrollView, View, AsyncStorage } from 'react-native';
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
} from 'native-base';
import * as Progress from 'react-native-progress';
import { deleteUser, getUser } from "../../actions/userActions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './Styles';
import FreeBuzz from "../FreeBuzz/FreeBuzz";
import { SERVER_URL } from "../../constants/Config";
import { calcLevel } from "../../services/Level";
import { AppLoading, Font } from 'expo';

class UserScreen extends React.Component {
    constructor() {
        super();
        let that = this;
        this.user = {
            id: '',
            checkins: 0,
            buzzes: 6,
            upvotes: 10
        };
        //this.getUserInfo();
        this.state = {
            fontLoaded: false,
            level: 3,
            dataArray: [
                {
                    title: "Show More", content:
                        <List>
                            <ListItem>
                                <Thumbnail size={10} source={require('../../assets/images/buzz3.png')} />
                                <Text>Buzzes</Text>
                                <Text>{this.user.buzzes}</Text>
                            </ListItem>
                            <ListItem>
                                <MaterialCommunityIcons name="marker-check" size={32} color="green" />
                                <Text>Check-ins</Text>
                                <Text>{this.user.checkins}</Text>
                            </ListItem>
                            <ListItem>
                                <Entypo name="thumbs-up" size={32} color="yellow" />
                                <Text>Up Votes</Text>
                                <Text>{this.user.upvotes}</Text>
                            </ListItem>
                        </List>
                },
            ],
            progress: 0.5
        }
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
            console.log('error loading icon fonts', error);
        }
    }

    // Grab User data
    async componentDidMount() {
        // this.props.getUser(this.user.id);
        if (this.user.id != '') {

            try {
                const userId = await AsyncStorage.getItem('userId');
                this.user.id = userId;
            }
            catch (error) {
                console.log("UserScreen: failed to get userId", error);
            }
        }
    }


    static navigationOptions = {
        title: 'Profile',
    };


    render() {

        if (!this.state.fontLoaded && this.props.user.reputationScore === undefined) {
            return <AppLoading />;
        }
        const { user } = this.props.user;
        console.log(user.firstName + ' - rep : ' + user.reputationScore);
        console.log(calcLevel(user.reputationScore));
        let result = [0, 0];//calcLevel(this.props.user.reputationScore);
        const level = result[0];
        const prog = result[1];
        return (


            <ScrollView style={styles.container}>
                <Container>
                    <Content>
                        <Card style={[styles.card, user.enterprise ? styles.enterprise : styles.normal]}>
                            <CardItem>
                                <Image source={{ uri: 'http://nbww.com/wp-content/uploads/2016/06/fot-static-promo-0608.jpg' }} style={{ height: 100, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem cardBody>
                                <Left>
                                    <Thumbnail source={{ uri: 'https://image.flaticon.com/icons/png/512/206/206879.png' }} />
                                    <MaterialCommunityIcons name="marker-check" size={32} color="green" />
                                    <Body>
                                        <Text>{user.firstName} {user.lastName}</Text>
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
                                        <Thumbnail source={require('../../assets/images/buzz3.png')} />
                                        <Text>2 Buzzes</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Content padder>
                                    <Accordion dataArray={this.state.dataArray} expandedIcon="add">
                                    </Accordion>
                                </Content>
                            </CardItem>
                            <CardItem>
                                <FreeBuzz progress={.60} />
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