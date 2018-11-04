import { createStackNavigator } from 'react-navigation';
import Layout from '../containers/Layout';
import NewTopicScreen from '../containers/NewTopicScreen/NewTopicScreen';
import Login from '../containers/Login';


const appNavigator = createStackNavigator(

    {
        Home: Layout,
        NewTopic: NewTopicScreen,
        Login: Login
    },
    {
        initialRouteName: 'Home'
    }

);

export default appNavigator;