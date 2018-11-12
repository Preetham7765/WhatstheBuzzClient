import { createSwitchNavigator } from 'react-navigation';
import {StyleSheet, Platform } from 'react-native';
import MapScreen from '../screens/MapScreen';
import NewTopicScreen from '../containers/NewTopicScreen/NewTopicScreen';
import Login from '../containers/Login';
import MainTabNavigator from './MainTabNavigator';

// const appNavigator = createStackNavigator(
//
//     {
//         Home: MapScreen,
//         NewTopic: NewTopicScreen,
//         Login: Login
//     },
//     {
//         initialRouteName: 'Home'
//     }
//
// );
export default createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Map: MapScreen,
        NewTopic: NewTopicScreen,
        Login: Login
    }
);

