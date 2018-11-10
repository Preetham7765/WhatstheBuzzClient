import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Platform,
    TextInput,
    Image,
    Dimensions
} from 'react-native';

import Styles from './Styles';
 
export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this._close = this._close.bind(this);
        this.state = {
            isShow: false,
            inputText: '',
            opacityAnimationValue: new Animated.Value(0),
            scaleAnimationValue: new Animated.Value(0)
        }
    }
 
    // open dialog
    show() {
        this.setState({
            isShow: true,
            inputText: this.props.inputText
        });
 
        //Animated.parallel 
        Animated.parallel([
            //Animated.timing == make animation by time
            Animated.timing(this.state.opacityAnimationValue, {
                toValue: 1,
                duration: 200 + 100
            }),
            //Animated.spring 
            Animated.spring(this.state.scaleAnimationValue, {
                toValue: 1,
                duration: 200,
                friction: 5
            })
        ]).start();
    }
 
    // close dialog
    _close() {
        this.setState({isShow: false});
        this.state.opacityAnimationValue.setValue(0);
        this.state.scaleAnimationValue.setValue(0);
    }
    
 
    render() {
        if (!this.state.isShow) return null;
 
        const {ensureCallback,titleTxt} = this.props;
 
        return (
            // outter part background
            <Animated.View style={[Styles.container, {opacity: this.state.opacityAnimationValue}]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex: 1, alignItems: 'center', paddingTop: 100}}
                    onPress={this._close}
                >
                    <Animated.View
                        style={[Styles.contentContainer, {transform: [{scale: this.state.scaleAnimationValue}]}]}
                    >
                        
                        <TouchableOpacity
                            activeOpacity={1}
                            style={Styles.promptContainer}
                        >
                            <Text style={{fontSize: 15, color: 'black'}}>{titleTxt}</Text>   
                            <View style={{flexDirection: 'row', margin: 15}}>
                                <View style={[Styles.center, {width: 230}]}> 
                                    <TextInput
                                        style={{fontSize: 16, color: '#999',width:150,padding:0}}
                                        value={this.state.inputText}
                                        autoFocus={true}
                                        underlineColorAndroid="transparent"
                                        onChangeText={text => this.setState({inputText:text})}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.setState({inputText: ''})}
                                    style={[Styles.center, {width: 20}]}>

                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity> 

                        <View style={Styles.buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={[Styles.center, {flex: 4.5}]}
                                onPress={this._close}
                            >
                                <Text style={{fontSize: 16, color: 'black'}}>cancel</Text>
                            </TouchableOpacity>
                            <View style={[Styles.line]}/>
                            
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={[Styles.center, {flex: 4.5}]}
                                onPress={() => {
                                    this._close();
                                    // pass input to its parent
                                    ensureCallback(this.state.inputText);
                                }}
                            >
                                <Text style={{fontSize: 16, color: 'black'}}>send</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}