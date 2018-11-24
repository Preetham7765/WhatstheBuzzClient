import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SERVER_URL from '../../../constants/Config';
import Styles from './Styles';

export default class Vote extends React.Component{
    constructor(props){
		super(props);
		this.state = {voteNumber : props.voteNumber, voteUp : false , voteDown : false};
	}

	// can't vote up and down at the same time
	voteUP = () => {
		const url = `${SERVER_URL}/api/comments/upvote/5bda0840335d2283c0d5d0ef/${this.props.commentId}/`;
		console.log(url);
        fetch(url,{
            method:'put',
        })
        .then((response) => { 
            console.log("vote up",response);
        })
        .catch((error) => {
            console.log("Error vote up failed", error);
        });
	};

	voteDown = () => {
		const url = `${SERVER_URL}/api/comments/downvote/5bda0840335d2283c0d5d0ef/${this.props.commentId}/`;
		console.log(url);
        fetch(url,{
            method:'put',
        })
        .then((response) => { 
            console.log("vote down",response);
        })
        .catch((error) => {
            console.log("Error vote down failed", error);
        });
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
                <TouchableOpacity  onPress = {this.voteDown} style={ this.state.voteDown ? Styles.marked : Styles.unMarked }><Text>-</Text></TouchableOpacity>
            </View>
        );
    }
}