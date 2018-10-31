import React, {Fragment} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform} from 'react-native';
import ActionBar from 'react-native-action-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import UserMap from './components/UserMap';
import { FloatingAction } from 'react-native-floating-action';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class App extends React.Component {

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
                <UserMap />
                <FloatingAction />
            </View>
        );
    }
}

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
