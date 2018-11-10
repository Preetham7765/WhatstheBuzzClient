import { createStackNavigator } from 'react-navigation';

import Layout from '../containers/Layout';
import NewTopicScreen from '../containers/NewTopicScreen/NewTopicScreen';
import Login from '../containers/Login';
import ThreadView from '../containers/Discussion/ThreadView/ThreadView'


const appNavigator = createStackNavigator(
    {
        Home: Layout,
        NewTopic: NewTopicScreen,
        Login: Login,
        ScreenThread : ThreadView
    },
    
    {
        initialRouteName: 'Home'
    }

);

export default appNavigator;