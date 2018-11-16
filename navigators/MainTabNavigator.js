import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import UsersMap from '../containers/UsersMap/UsersMap';
import UserScreen from '../containers/UserScreen/UserScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import DemoScreen from '../screens/DemoScreen';

const MapStack = createStackNavigator({
    Map: UsersMap,
},{
    headerMode: 'none',
});

MapStack.navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? 'ios-map'
                    : 'map-md'
            }
        />
    )
};

// const Stack = createStackNavigator({
//     Links: LinksScreen,
// });
//
// LinksStack.navigationOptions = {
//     tabBarLabel: 'Links',
//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//         />
//     ),
// };
//
// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen,
// });
//
// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Settings',
//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//         />
//     ),
// };

const UserStack = createStackNavigator({
    User: UserScreen,
},{
    headerMode: 'none',
});

UserStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

export default createBottomTabNavigator({
    MapStack,
   UserStack
});
