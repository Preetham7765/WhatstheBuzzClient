import React from 'react';
import {View, Text, StyleSheet,Button, ScrollView} from 'react-native';

import Vote from '../../../containers/Discussion/Vote/VoteBar';
import SpamButton from '../../../containers/Discussion/ReportSpam/ReportSpam';
import DuplicateButton from '../../../containers/Discussion/ReportDuplicate/ReportDuplicate';
import Styles from './Styles';


export default class CommentHead extends React.Component {
	render(){
		return(
			//vote + content
			<View style = {Styles.windowHead}>
				<View style = {{flex : 1}}>
					<Vote voteNumber = {998} />
				</View>
				<View style = {Styles.headContent}>
					<Text style = {Styles.title}> {this.props.title}</Text>
					<ScrollView>
						<Text style = {Styles.description}>{this.props.description}</Text>
					</ScrollView>
					<View style = {Styles.eventInfo}>
						<Text>{this.props.time}</Text>
						<Text>{this.props.location}</Text>
						<Text>{this.props.author}</Text>
					</View>
					<View style = {Styles.userAction}>
						<SpamButton spamNum = {10} spam = {false} />
						<DuplicateButton duplicateNum = {10} duplicate = {false} />
					</View>
				</View>
			</View>
		);
	}
}

