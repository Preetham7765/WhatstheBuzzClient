
import React from 'react';
import { View, Text, StyleSheet, Button, TextInput,TouchableOpacity } from 'react-native';
import Vote from '../../../containers/Discussion/Vote/VoteBar';
import Styles from './Styles';



class CommentText extends React.Component {
    render() {

        return (
            <View style={Styles.userInfoContainer}>
                <Text style={Styles.userInfoText}>{this.capitalize(this.props.authorName)} says:</Text>
                <Text style={Styles.comment}>{this.props.commentDesc}</Text>
                {this.props.isOwner ?
                    <OwnerAction enterEditMode={this.props.enterEditMode} delete={this.props.delete} />
                    : null}
            </View>
        );
    }

    capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

class OwnerAction extends React.Component {
    render() {
        return (
            <View style={Styles.ownerAction}>
                <TouchableOpacity onPress = {this.props.enterEditMode}><Text style={{ fontSize: 12 ,color : "#6666ff"}} >Edit</Text></TouchableOpacity>
                <TouchableOpacity onPress = {this.props.delete}><Text style={{ fontSize: 12 ,color : "#ff0066"}} >Delete</Text></TouchableOpacity>
            </View>
        );
    }
}


class EditModeComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { commentDesc: this.props.commentDesc };
    }
    render() {
        return (
            <View style={Styles.userInfoContainer}>
                <TextInput onChangeText={(text) => this.setState({ commentDesc: text })} value={this.state.commentDesc} style={Styles.editComment}/>
                <View style={Styles.ownerAction}>
                <TouchableOpacity onPress = {this.props.cancel}><Text style={{ fontSize: 12,textDecorationLine : "underline",color : "#009999" }} >Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.submit(this.state.commentDesc)}><Text style={{ fontSize: 12,textDecorationLine : "underline",color : "#33ccff" }} >Submit</Text></TouchableOpacity>    
                </View>
            </View>
        );
    }
}

export default class CommentView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props.socket.on('editComment', this.onEditComment);
        this.props.socket.on('deleteComment', this.onDeleteComment);
        this.state = { commentDesc: this.props.commentDesc, editMode: false, showComment: true, isOwner: this.isOwner() };
    }
    render() {
        if (this.state.showComment) {
            return (
                <View styles={Styles.container}>
                    <View style={Styles.card}>
                        <View style={{ flex: 1 }}>
                            <Vote voteNumber={this.props.commentCtr} _id={this.props.commentId} voted={this.voted()} userId={this.props.userId} type={"comment"} socket={this.props.socket} />
                        </View>
                        <View style={{ flex: 8 }}>
                            {this.state.editMode ?
                                //Enter edit mode
                                <EditModeComment changeText={(text) => { this.setState({ commentDesc: text }) }} commentDesc={this.state.commentDesc} submit={this.submit} cancel={this.cancel} />
                                //read comment , can enter edit mode
                                : <CommentText authorName={this.props.authorName} commentDesc={this.state.commentDesc} enterEditMode={this.edit} delete={this.delete} isOwner={this.state.isOwner} />}
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return null;
        }
    }

    delete = () => {
        const comment = {
            _id: this.props.commentId,
        }
        this.props.socket.emit("deleteComment", comment);
    }

    onDeleteComment = (msg) => {
        if (msg._id == this.props.commentId) {
            this.setState({ showComment: false });
        }
    }

    edit = () => {
        this.setState({ editMode: true });
    }

    cancel = () => {
        this.setState({ editMode: false });
    }

    onEditComment = (msg) => {
        if (msg._id == this.props.commentId) {
            this.setState({ commentDesc: msg.description });
        }
    }

    submit = (text) => {

        this.setState({ editMode: false });
        const comment = {
            _id: this.props.commentId,
            commentDesc: text
        }
        this.props.socket.emit("editComment", comment);

    }

    isOwner = () => {
        if (this.props.authorId == this.props.userId) {
            return true;
        }
        else {
            return false;
        }
    }

    voted = () => {
        for (var i = 0; i < this.props.votedby.length; i++) {
            if (this.props.votedby[i] === this.props.userId) {
                return true;
            }
        }
        return false;
    }
}