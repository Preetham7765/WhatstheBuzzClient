import { createStackNavigator } from 'react-navigation';
import MapScreen from '../screens/MapScreen';
import NewTopicScreen from '../containers/NewTopicScreen/NewTopicScreen';
import MainTabNavigator from './MainTabNavigator';
import Login from '../containers/Login';
import ThreadView from '../containers/Discussion/ThreadView/ThreadView'

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
export default createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    // Map: MapScreen,
        NewTopic: NewTopicScreen,
        Login: Login,
    ScreenThread : ThreadView
    }
);

