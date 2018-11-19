import React from 'react';
import { Platform, View, StyleSheet, FlatList } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';


import CommentHead from '../../../components/DiscussionScreen/CommentHead/CommentHead';
import CommentView from '../../../components/DiscussionScreen/CommentView/CommentView';
import PlusButton from '../../../components/DiscussionScreen/Plus/Plus';
import CommentWindow from '../CommentWindow/CommentWindow';
import { GiftedChat } from 'react-native-gifted-chat';
import Aux from '../../../hoc/Auxi';

import SERVER_URL from '../../../constants/Config';

export default class ThreadView extends React.Component{

    state = {
        messages: []
    }


    onSendNewComment = (messages= []) => {

        // send the data to the server.
        const authorId =  messages[0].user._id;
        const comment = messages[0].text;
        
        const url = `${SERVER_URL}/api/comments`;
        const newComment = {
            authorId: authorId,
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
        .then((response) => { 
            console.log("Sent new comment Successfully",response);
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }));
        })
        .catch((error) => {
            console.log("Error new comment send failed", error);
        });

    }

    renderMessage(props) {
        const { currentMessage: { text: currText, user : {name : authorname} } } = props;

        return <CommentView 
                authorName = {authorname}
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
                        _id: "5bda0840335d2283c0d5d0ef",
                        name: "Chris"
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
        const url = `${SERVER_URL}/api/comments/${this.props.navigation.getParam('topicId', null)}`;
        fetch(url)
        .then( (response) => {
            return response.json();
        })
        .then( (respJson) => {

            console.log(respJson);
            this.setState({messages: [... respJson]});


        });

        // this.setState({
        //     messages: [
        //       {
        //         _id: 1,
        //         text: 'Hello developer',
        //         createdAt: new Date(),
        //         user: {
        //           _id: 2,
        //           name: 'React Native',
        //           avatar: 'https://placeimg.com/140/140/any',
        //         },
        //       },
        //     ],
        //   })
    }

}