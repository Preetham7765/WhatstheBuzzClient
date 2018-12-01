import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SERVER_URL } from '../../../constants/Config';
import Styles from './Styles';

export default class Vote extends React.Component{
    constructor(props){
		super(props);
		this.state = {voteNumber : props.voteNumber, voteUp : props.voted };
		this.props.socket.on('vote', this.onVote);
	}

	serverVoteUp = ()=> {
		if(this.props.type === "comment"){
			const msg = {
				_id : this.props.commentId,
				user : this.props.userId,
			}
			this.props.socket.emit("voteUpComment",msg);
		}
		else{
			const msg = {
				_id : this.props.topicId,
				user : this.props.userId,
			}
			this.props.socket.emit("voteUpTopic",msg);
		}
	}

	serverVoteDown = () => {
		if(this.props.type === "comment"){
			const msg = {
				_id : this.props.commentId,
				user : this.props.userId,
			}
			this.props.socket.emit("voteDownComment",msg);
		}
		else{
			const msg = {
				_id : this.props.topicId,
				user : this.props.userId,
			}
			this.props.socket.emit("voteDownTopic",msg);
		}
	}

	onVote = (msg) =>{
		if((this.props.commentId === msg._id) || (this.props.topicId == msg._id)){
			this.setState({voteNumber : msg.votes});
		}
	}	


	voteUP = () => {		
		if(!this.state.voteUp){
			this.setState((state,props) => {return {voteUp : true}});
			this.serverVoteUp();
		}
		else{
			this.setState((state,props) => {return {voteUp : false}});
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