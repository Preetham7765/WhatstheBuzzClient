import React from 'react';
import { KeyboardAvoidingView, FlatList, Keyboard } from 'react-native';
import { Location } from 'expo';
import SocketIOClient from 'socket.io-client';

import CommentHead from '../../../components/DiscussionScreen/CommentHead/CommentHead';
import CommentView from '../../../components/DiscussionScreen/CommentView/CommentView';
import { SERVER_URL } from '../../../constants/Config';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import InputToolbar from '../../../components/DiscussionScreen/InputToolBar/InputToolBar';
import Styles from './Styles';


export default class ThreadView extends React.Component {

    constructor(props) {
        super(props);
        this.socket = SocketIOClient(SERVER_URL);;
        this.socket.on('newComment', this.onReceivedMessage);
        this.socket.on('addCommentStatus', this.onUpdateComments);
        this.shouldScroll = false;
        this.state = {
            commentText: '',
        }
    }


    onSendNewComment = () => {

        if (this.state.commentText === '')
            return;

        // send the data to the server.
        const authorId = "5beb57fb7a732933a40e8192";
        const comment = this.state.commentText;

        // const url = `${SERVER_URL}/api/comments`;
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

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom) {
             console.log("Setting should scroll to true");
            this.shouldScroll = true;
        }
        else {
            this.shouldScroll = false;
        }
    };


    onInputChangeHandler = (newText) => {

        this.setState({ commentText: newText });

    }

    onReceivedMessage = (message) => {
        console.log("Got from socket new message", message);
        let newState = { ...this.state };
        newState.topic.comments.push(message);
        this.setState({ ...newState });

    }

    onUpdateComments = (message) => {
        if (message === 'Error') {
            console.log("Error adding new comment", message);
            return;
        }

        let newState = { ...this.state };
        newState.topic.comments.push(message);
        newState.commentText = '';
        this.setState({ ...newState });
        Keyboard.dismiss();
    }

    renderMessage = ({ item }) => {
        // const { currentMessage: { text: currText, user: { name: authorname }, votes: voteNum, _id: commentID, votedby: voteBy } } = props;
        const authorName = item.user.name;
        const currText = item.text;
        const voteNum = item.votes;
        const commentID = item._id;
        const voteBy = item.votedby;
        const authorId = item.user._id;
        console.log(item);
        return <CommentView
            commentId={commentID}
            authorName={authorName}
            commentDesc={currText}
            commentCtr={voteNum}
            votedby={voteBy}
            authorId = {authorId}
            userId="5beb57fb7a732933a40e8192"
            socket = {this.socket}
        />
    }

    renderTopicDetails = () => (<CommentHead
        title={this.state.topic.title}
        description={this.state.topic.description}
        author={this.state.topic.author}
        time={this.state.topic.time}
        location={this.state.topic.location}
        voteNumber={this.state.topic.votes} 
        topicId = {this.state.topic._id} 
        userId = "5beb57fb7a732933a40e8192"
        votedby = {this.state.topic.votedby}
        socket = {this.socket}
    />);


    render() {
        if (this.state.topic === undefined)
            return <ErrorScreen errorMessage="Loading" />
        else
            return (
                <KeyboardAvoidingView
                    style={Styles.container}
                    behavior="padding"
                    keyboardVerticalOffset={ Platform.OS === "android"? 85 : 0 }>>
                    <FlatList
                        ref={ref => this.flatList = ref}
                        style={Styles.flatListStyle}
                        data={this.state.topic.comments}
                        renderItem={this.renderMessage}
                        keyExtractor={(item) => item._id}
                        ListHeaderComponent={this.renderTopicDetails}
                        onContentSizeChange={() => {
                            if (this.shouldScroll)
                                this.flatList.scrollToEnd({ animated: true });
                        }}
                        onScroll={({ nativeEvent }) => { this.isCloseToBottom(nativeEvent) }}
                    />
                    <InputToolbar
                        style={Styles.flatListStyle}
                        value={this.state.commentText}
                        changed={this.onInputChangeHandler}
                        clicked={this.onSendNewComment}
                    />

                </KeyboardAvoidingView>
            );
        /*
            return (
                <Aux>
                    <CommentHead
                        title={this.state.topic.title}
                        description={this.state.topic.description}
                        author={this.state.topic.author}
                        time={this.state.topic.time}
                        location={this.state.topic.location}

                        voteNumber={this.state.topic.votes} 
                        topicId = {this.state.topic._id} 
                        userId = "5beb57fb7a732933a40e8192"
                        votedby = {this.state.topic.votedby}
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
        */
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
                //console.log(topicLocation);

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
                        //console.log("New topic", respJson);
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