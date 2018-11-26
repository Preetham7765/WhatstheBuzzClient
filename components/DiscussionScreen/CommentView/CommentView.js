
import React from 'react';
import {View, Text, StyleSheet, Button ,TextInput} from 'react-native';
import Vote from '../../../containers/Discussion/Vote/VoteBar';
import Styles from './Styles';
import { SERVER_URL } from '../../../constants/Config';

class CommentText extends React.Component{
    render(){
        return(
                <View style={Styles.userInfoContainer}>
                    <Text style={Styles.comment}>{this.props.commentDesc}</Text>
                    <Text style={Styles.userInfoText}>-{this.props.authorName}</Text>
                    <View style={Styles.ownerAction}>
                    <Button onPress = {this.props.enterEditMode} title = "Edit"/>
                    <Button onPress = {this.props.delete} title = "Delete"/>
                    </View>
                </View>
        );
    }
}

class EditModeComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {commentDesc : this.props.commentDesc};
    }
    render(){
        return(
                <View style={Styles.userInfoContainer}>
                    <TextInput onChangeText={(text) => this.setState({commentDesc : text})} value = {this.state.commentDesc} />
                    <View style={Styles.ownerAction}>
                    <Button onPress = {this.props.cancel} title = "Cancel"/>
                    <Button onPress = {() => this.props.submit(this.state.commentDesc)} title = "Submit"/>
                    </View>
                </View>
        );
    }
}

export default  class CommentView extends React.Component{
    constructor(props){
        super(props);
        this.state= {commentDesc : this.props.commentDesc, editMode : false, showComment : true};
    }
    render(){
        if(this.state.showComment){
            return(
                <View styles={Styles.container}>
                    <View style={Styles.card}>
                        <View style = {{flex : 1}}>
                            <Vote voteNumber={this.props.commentCtr} commentId = {this.props.commentId} voted = {this.voted()}  userId = {this.props.userId}/>
                        </View>
                        <View style = {{flex : 8}}>
                        {this.state.editMode ?
                                <EditModeComment changeText = {(text) => {this.setState({commentDesc : text})}} commentDesc = {this.state.commentDesc} submit = {this.submit} cancel = {this.cancel}/> 
                            :   <CommentText authorName={this.props.authorName} commentDesc={this.state.commentDesc} enterEditMode = {this.edit} delete = {this.delete}/>}
                        </View>
                    </View>
                </View>
            );
        }
        else{
            return null;
        }
    }

    delete = () => {
        //change locally
        this.setState({showComment : false});

        //update server
        const url = `${SERVER_URL}/api/comments/delete/${this.props.commentId}/`;
		fetch(url,{
			method:'put',
		})
		.then((response) => { 
			console.log("delete comment",response);
		})
		.catch((error) => {
			console.log("Error delete comment", error);
		});
    }
    edit = () => {
        this.setState({editMode : true});
    }

    cancel = () => {
        this.setState({editMode : false});
    }
    submit = (text) => {
        //change locally
        this.setState({editMode : false , commentDesc : text});

        //submit to server
        const url = `${SERVER_URL}/api/comments/edit/${this.props.commentId}/${text}`;
		fetch(url,{
			method:'put',
		})
		.then((response) => { 
			console.log("edit comment",response);
		})
		.catch((error) => {
			console.log("Error edit comment", error);
		});
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