import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Styles from './Styles';

export default class Vote extends React.Component{
    constructor(props){
		super(props);
		this.state = {voteNumber : props.voteNumber, voteUp : false , voteDown : false};
	}

	// can't vote up and down at the same time
	voteUP = () => {
		if(!this.state.voteUp){
			this.setState((state,props) => {return {voteNumber : state.voteNumber + 1 , voteUp : true}});
			if(this.state.voteDown){
				this.setState((state,props) => {return {voteNumber : state.voteNumber + 1, voteDown : false}});
			}
		}
		else{
			this.setState((state,props) => {return {voteNumber : state.voteNumber - 1 , voteUp : false}});
		}
	};

	voteDown = () => {
		if(!this.state.voteDown){
			this.setState((state,props) => {return {voteNumber : state.voteNumber - 1, voteDown : true}});
			if(this.state.voteUp){
				this.setState((state,props) => {return {voteNumber : state.voteNumber - 1, voteUp : false}});
			}
		}
		else{
			this.setState((state,props) => {return {voteNumber : state.voteNumber + 1, voteDown : false}});
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
                <TouchableOpacity  onPress = {this.voteDown} style={ this.state.voteDown ? Styles.marked : Styles.unMarked }><Text>-</Text></TouchableOpacity>
            </View>
        );
    }
}