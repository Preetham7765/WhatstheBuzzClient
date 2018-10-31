import React, {Fragment} from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import ActionBar from 'react-native-action-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import UserMap from './components/UserMap';
import { FloatingAction } from 'react-native-floating-action';
import {Constants, Location, Permissions} from 'expo';

export default class App extends React.Component {

    state = {
        userLocation: null,
        nearbyEvents: null,
        errMessage: null
    }

    componentWillMount() {

        if(!this.state.userLocation && !this.state.errMessage){

            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                  errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                });
              } else {
                Permissions.askAsync(Permissions.LOCATION)
                .then((reponse)=> {
                    if(reponse.status !== 'granted'){
                        this.setState({errMessage: 'Permission to access location denied'});
                    }    
                })
                .catch((error) => {
                    this.setState({errMessage: 'Permission to access location denied'}); 
                });

                Location.getCurrentPositionAsync({})
                .then((response) => {
                    console.log(response);
                    this.setState({userLocation: response})
                .catch((error) => {
                    console.log("Error" ,error);
                })
                });

            }
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor="#5E8D48" barStyle="default" />
                <ActionBar
                    containerStyle={styles.bar}
                    title={'Whats the buzz'}
                    leftIconName={'Menu'}
                    leftBadge={''}
                />
                <UserMap userLocation={this.state.userLocation}/>
                <FloatingAction />
            </View>
        );
    }
}


const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const STATUSBAR_HEIGHT = getStatusBarHeight();
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 40 : 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor:'#79B45D',
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
