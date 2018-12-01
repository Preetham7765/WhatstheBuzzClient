
import React from 'react';
import { View, Text } from 'react-native';
import Vote from '../../../containers/Discussion/Vote/VoteBar';
import Styles from './Styles';

class CommentText extends React.Component {
    render() {
        return (
            <View style={Styles.userInfoContainer}>
                <Text style={Styles.comment}>{this.props.commentDesc}</Text>
                <Text style={Styles.userInfoText}>-{this.props.authorName}</Text>
            </View>
        );
    }
}

export default class CommentView extends React.PureComponent {
    render() {
        return (
            <View styles={Styles.container}>
                <View style={Styles.card}>
                    <View style={{ flex: 1 }}>
                        <Vote voteNumber={this.props.commentCtr} commentId={this.props.commentId} voted={this.voted()} userId={this.props.userId} />
                    </View>
                    <View style={{ flex: 8 }}>
                        <CommentText authorName={this.props.authorName} commentDesc={this.props.commentDesc} />
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