import React, {Fragment} from 'react';
import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import ActionBar from 'react-native-action-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import UserMap from './components/UserMap';
import { FloatingAction } from 'react-native-floating-action';
import {Constants, Location, Permissions} from 'expo';

export default class App extends React.Component {

    state = {
        userLocation: null,
        nearbyTopics: null,
        errMessage: null
    }

    componentWillMount() {

        if(!this.state.userLocation && !this.state.errMessage){

            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                });
            } else {
                this._getLocationAsync();
            }    
        }

    }


    _getLocationAsync = async () => {
        console.log("getting status");
        let isLocationEnbaled = false;
        do {
           let { status } = await Permissions.askAsync(Permissions.LOCATION);
           if (status !== 'granted') {
            this.setState({
              errorMessage: 'Permission to access location was denied',
            });
          }
            let location = null;
            try{
                location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            }
            catch(error){
                this.setState({
                    errorMessage: 'Please turn on your location',
                  });
                isLocationEnbaled = false;
                continue;
            }
            console.log("got location");
            isLocationEnbaled = true;
            this.setState({ userLocation: location });

        }while(!isLocationEnbaled);
        
    }

    render() {
        let text= "Loading....";

        if(this.state.errMessage){
            text = this.state.errMessage;
        }else if(this.state.userLocation){
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
        return (<View>
                    <Text style={{alignContent: 'center'}}>{text}</Text>
                </View> );
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
