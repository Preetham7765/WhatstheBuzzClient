import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SERVER_URL } from '../../../constants/Config';
import Styles from './Styles';

export default class Vote extends React.Component{
    constructor(props){
		super(props);
		this.state = {voteNumber : props.voteNumber, voteUp : props.voted };
	}

	serverVoteUp = () =>{
		var url;
		if(this.props.type === "comment"){
			url = `${SERVER_URL}/api/comments/upvote/${this.props.userId}/${this.props.commentId}`;
		}
		else{
			url = `${SERVER_URL}/api/topics/upvote/${this.props.userId}/${this.props.topicId}`;
		}
		fetch(url,{
			method:'put',
		})
		.then((response) => { 
			console.log("vote up",response);
		})
		.catch((error) => {
			console.log("Error vote up failed", error);
		});
	}

	serverVoteDown =()=>{
		var url;
		if(this.props.type === "comment"){
			url = `${SERVER_URL}/api/comments/downvote/${this.props.userId}/${this.props.commentId}`;
		}
		else{
			url = `${SERVER_URL}/api/topics/downvote/${this.props.userId}/${this.props.topicId}`;
		}
		fetch(url,{
			method:'put',
		})
		.then((response) => { 
			console.log("vote down",response);
		})
		.catch((error) => {
			console.log("Error vote up failed", error);
		});
	}

	voteUP = () => {		
		if(!this.state.voteUp){
			this.setState((state,props) => {return {voteNumber : state.voteNumber + 1 , voteUp : true}});
			this.serverVoteUp();
		}
		else{
			this.setState((state,props) => {return {voteNumber : state.voteNumber - 1 , voteUp : false}});
			this.serverVoteDown();
		}
	};
	getVoteText = () => {
		if(this.state.voteNumber <= 1000){
			return this.state.voteNumber;
		}
		else{
			return "1K+";
		}
	}

    render(){
        return(
            <View style={Styles.voteContainer}>
                <TouchableOpacity  onPress ={this.voteUP} style={ this.state.voteUp ? Styles.marked : Styles.unMarked }><Text>+</Text></TouchableOpacity>
                <Text style={{textAlignVertical: "center",textAlign: "center",}}>{this.getVoteText()}</Text>
            </View>
        );
    }
}