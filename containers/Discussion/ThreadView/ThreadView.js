import React from 'react';
import { Platform, View, StyleSheet, FlatList } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import { Location } from 'expo';
import SocketIOClient from 'socket.io-client';

import CommentHead from '../../../components/DiscussionScreen/CommentHead/CommentHead';
import CommentView from '../../../components/DiscussionScreen/CommentView/CommentView';
import Aux from '../../../hoc/Auxi';
import { SERVER_URL } from '../../../constants/Config';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';



export default class ThreadView extends React.Component {

    state = {}

    constructor(props) {
        super(props);
        this.socket = SocketIOClient(SERVER_URL);
        this.socket.on('newComment', this.onReceivedMessage);

    }


    onSendNewComment = (message = []) => {

        // send the data to the server.
        const authorId = message[0].user._id;
        const comment = message[0].text;

        const url = `${SERVER_URL}/api/comments`;
        const newComment = {
            authorId: authorId,
            topicId: this.props.navigation.getParam('topicId', null),
            comment: comment
        }
        console.log(newComment);
        this.socket.emit("addNewComment", newComment);


        /*fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(newComment)
        })
            .then((response) => {
                console.log("Sent new comment Successfully", response);
                let newState = { ...this.state };
                newState.topic.comments = GiftedChat.append(this.state.topic.comments, message);
                this.setState({ newState });
            })
            .catch((error) => {
                console.log("Error new comment send failed", error);
            });
        */
    }

    onReceivedMessage = (message) => {
        console.log("Got from socket new message", message);
        let newState = { ...this.state };
        newState.topic.comments = GiftedChat.append(this.state.topic.comments, message);
        this.setState({ newState });

    }

    renderMessage(props) {
        const { currentMessage: { text: currText, user : {name : authorname} , votes : voteNum , _id : commentID , votedby : voteBy} } = props;

        return <CommentView 
                authorName = {authorname}
                commentDesc = {currText}
                commentCtr = {voteNum}
                commentId = {commentID}
                votedby = {voteBy}
                userId = "5bda0840335d2283c0d5d0ef"
                />
    }


    render() {
        if (this.state.topic === undefined)
            return <ErrorScreen errorMessage="Loading" />
        else
            return (
                <Aux>
                    <CommentHead
                        title={this.state.topic.title}
                        description={this.state.topic.description}
                        author={this.state.topic.author}
                        time={this.state.topic.time}
                        location={this.state.topic.location}
                    />
                    <GiftedChat
                        messages={this.state.topic.comments}
                        keyboardShouldPersistTaps={'always'}
                        onSend={message => this.onSendNewComment(message)}
                        user={{
                            _id: "5bda0840335d2283c0d5d0ef",
                            name: "Chris"
                        }}
                        renderMessage={this.renderMessage}
                    />
                    {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
                </Aux>
                // </View>
            );
    }

    componentDidMount() {
        // fetch results from server. props will have the id of the buzz/event

        this.socket.emit('addUser', this.props.navigation.getParam('topicId', null));

        const url = `${SERVER_URL}/api/comments/${this.props.navigation.getParam('topicId', null)}`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((respJson) => {

                const topicLocation = {
                    latitude: respJson.topic.location[1],
                    longitude: respJson.topic.location[0]
                }
                console.log(topicLocation);

                Location.reverseGeocodeAsync(topicLocation)
                    .then(res => {
                        // res is an Array of geocoding object (see below)
                        // console.log("geolocation position", res);
                        const creationDate = new Date(respJson.topic.time);
                        const hours = creationDate.getHours();
                        const minutes = creationDate.getMinutes();
                        const time = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
                        respJson.topic.location = res[0].street;
                        respJson.topic.time = time;
                        // ressJson.topic.time = creationDate;
                        console.log("New topic", respJson);
                        this.setState({ ...respJson });
                    })
                    .catch(err => console.log(err))

            });
    }

    componentWillUnmount() {

        this.socket.emit("removeUser", this.props.navigation.getParam('topicId', null));
        this.socket.disconnect();

    }

}