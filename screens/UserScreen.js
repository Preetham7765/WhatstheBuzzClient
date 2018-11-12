import React from 'react';
import {
    ProgressBarAndroid,
    ProgressViewIOS,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Accordion} from 'native-base';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class DemoScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            username: 'Chris',
            level: 3,
            dataArray: [
                { title: "Show More", content: "Lorem ipsum dolor sit amet" },
            ]
        }
    }
    static navigationOptions = {
       title: 'Profile',
    };


    render() {
        return (
            <ScrollView style={styles.container}>


                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Image source={{uri: 'http://nbww.com/wp-content/uploads/2016/06/fot-static-promo-0608.jpg'}} style={{height: 100, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem cardBody>
                                <Left>
                                    <Thumbnail source={{uri: 'https://image.flaticon.com/icons/png/512/206/206879.png'}} />
                                    <Body>
                                    <Text>{this.state.username}</Text>
                                    <Text note>Level {this.state.level}</Text>
                                    </Body>
                                </Left>
                                <View style={styles.container}>
                                    <ProgressViewIOS style={styles.progressView} progress={.5}/>
                                </View>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Left>
                                <Body>
                                <Button transparent>
                                    <Thumbnail style={{overlayColor:'blue'}} source={{uri: 'data:image/png;base64,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'}} />
                                    <Text>2 Buzzes</Text>
                                </Button>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Content padder>
                                    <Accordion dataArray={this.state.dataArray} expandedIcon="remove"><Icon ios='ios' active name="plus" /></Accordion>
                                </Content>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
                <Image
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png'}}
                    style={styles.image}>
                </Image>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        borderWidth: 4,
        borderColor: '#d6d7da'
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressView: {
        marginTop: 20,
    }
});