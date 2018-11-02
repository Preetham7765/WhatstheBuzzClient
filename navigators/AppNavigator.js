import { createStackNavigator } from 'react-navigation';
import Layout from '../containers/Layout';
import NewTopicScreen from '../components/NewTopicScreen/NewTopicScreen';

const appNavigator = createStackNavigator(

    {
        Home: Layout,
        NewTopic: NewTopicScreen

    },
    {
        initialRouteName: 'Home'
    }

);

export default appNavigator;