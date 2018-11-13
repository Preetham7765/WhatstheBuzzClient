import { createStackNavigator } from 'react-navigation';
import Layout from '../containers/Layout';
import NewTopicScreen from '../containers/NewTopicScreen/NewTopicScreen';
import Login from '../containers/Login';
import Register from '../containers/Register';

const appNavigator = createStackNavigator(

    {
        Home: Layout,
        NewTopic: NewTopicScreen,
        Register: Register,
        Login: Login
    },
    {
        initialRouteName: 'Login'
    }
);

export default appNavigator;