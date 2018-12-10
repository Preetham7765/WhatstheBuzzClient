import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Vote from '../../../containers/Discussion/Vote/VoteBar';
import SpamButton from '../../../containers/Discussion/ReportSpam/ReportSpam';
import DuplicateButton from '../../../containers/Discussion/ReportDuplicate/ReportDuplicate';
import Styles from './Styles';


export default class CommentHead extends React.PureComponent {
	render() {
		return (
			//vote + content
			<View style={Styles.windowHead}>
				<View style={{ flex: 1 }}>
					<Vote voteNumber={this.props.voteNumber} _id={this.props.topicId} voted={this.voted()} socket={this.props.socket} userId={this.props.userId} type={"topic"} />
				</View>
				<View style={Styles.headContent}>
					<Text style={Styles.title}> {this.props.title}</Text>
					<ScrollView>
						<Text style={Styles.description}>{this.props.description}</Text>
					</ScrollView>
					<View style={Styles.eventInfo}>
                        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Icon name="access-time" size = {20} color="#E53935"/>
							<Text>{this.props.time}</Text>
						</View>
						<View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Icon name="location-on" size = {20} color="#6200EA"/>
							<Text>{this.props.location}</Text>
						</View>
                        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Icon name="person" size = {20} color="#00E676"/>
							<Text>{this.props.author}</Text>
						</View>
					</View>
					<View style={Styles.userAction}>
						<SpamButton spamNum={10} spam={false} />
					</View>
				</View>
			</View>
		);
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

