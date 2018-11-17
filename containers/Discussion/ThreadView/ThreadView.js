import React from 'react';
import { Platform, View, StyleSheet, FlatList } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';


import CommentHead from '../../../components/DiscussionScreen/CommentHead/CommentHead';
import CommentView from '../../../components/DiscussionScreen/CommentView/CommentView';
import PlusButton from '../../../components/DiscussionScreen/Plus/Plus';
import CommentWindow from '../CommentWindow/CommentWindow';
import { GiftedChat } from 'react-native-gifted-chat';
import Aux from '../../../hoc/Auxi';


const data =[
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
];
export default class ThreadView extends React.Component{

    state = {
        messages: []
    }


    onSendNewComment = (messages= []) => {

        // send the data to the server.
        /*const url = 'http://192.168.1.94:5000/api/comments';
        const newComment = {
            author: 'Chris',
            topicId: this.props.navigation.getParam('topicId', null),
            comment: comment
        }
        console.log(newComment);
        fetch(url,{
            method:'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(newComment)
        })
        .then((reponse) => { console.log("Sent new comment Successfully")})
        .catch((error) => {
            console.log("Error new comment send failed");
        });*/

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
          }));
    }

    renderMessage(props) {
        const { currentMessage: { text: currText, user : {name : authorname} } } = props;

        return <CommentView 
                author = {authorname}
                commentDesc = {currText}
                commentCtr = {10}
                />
    }
    

    render(){
        return(
            <Aux>
                <View>
                    <CommentHead/>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    keyboardShouldPersistTaps = {'always'}
                    onSend={messages => this.onSendNewComment(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderMessage={this.renderMessage}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
            </Aux>
            // </View>
        );
    }

    componentDidMount() {
        // fetch results from server. props will have the id of the buzz/event

        this.setState({
            messages: [
              {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
            ],
          })
    }

}