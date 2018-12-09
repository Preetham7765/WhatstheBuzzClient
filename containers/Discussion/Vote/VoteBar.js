import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SERVER_URL } from '../../../constants/Config';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Vote extends React.Component {
	constructor(props) {
		super(props);
		this.state = { voteNumber: props.voteNumber, voteUp: props.voted };
		this.props.socket.on('vote', this.onVote);
		this.msg = {
			_id: this.props._id,
			user: this.props.userId,
		}
	}

	serverVoteUp = () => {
		if (this.props.type === "comment") {
			this.props.socket.emit("voteUpComment", this.msg);
		}
		else {
			this.props.socket.emit("voteUpTopic", this.msg);
		}
	}

	serverVoteDown = () => {
		if (this.props.type === "comment") {
			this.props.socket.emit("voteDownComment", this.msg);
		}
		else {
			this.props.socket.emit("voteDownTopic", this.msg);
		}
	}

	onVote = (msg) => {
		if (this.props._id == msg._id) {
			this.setState({ voteNumber: msg.votes });
		}
	}


	voteUP = () => {
		if (!this.state.voteUp) {
			this.setState((state, props) => { return { voteUp: true } });
			this.serverVoteUp();
		}
		else {
			this.setState((state, props) => { return { voteUp: false } });
			this.serverVoteDown();
		}
	};

	getVoteText = () => {
		if (this.state.voteNumber <= 1000) {
			return this.state.voteNumber;
		}
		else {
			return "1K+";
		}
	}

	render() {
		return (
			<View style={Styles.voteContainer}>
				<TouchableOpacity onPress={this.voteUP} style={Styles.voteButton}><Icon name="thumbs-o-up" style={this.state.voteUp ? Styles.marked : Styles.unMarked} size={25}/></TouchableOpacity>
				<Text style={{ textAlignVertical: "center", textAlign: "center", }}>{this.getVoteText()}</Text>
			</View>
		);
	}
}