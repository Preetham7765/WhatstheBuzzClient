import { createStackNavigator } from "react-navigation";
import NewTopicScreen from "../containers/NewTopicScreen/NewTopicScreen";
import MainTabNavigator from "./MainTabNavigator";
import Login from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import EnterpriseRegister from "../containers/EnterpriseRegister/EnterpriseRegister"
import ThreadView from "../containers/Discussion/ThreadView/ThreadView";

const appNavigator = createStackNavigator(
    {
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        Main: {
            screen: MainTabNavigator,
            navigationOptions: {
                headerTitle: 'Home',
                headerStyle: {
                    backgroundColor: '#48BBEC',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }

        },
        NewTopic: NewTopicScreen,
        Login: Login,
        Register: Register,
        EnterpriseRegister: EnterpriseRegister,
        ScreenThread: ThreadView
    },
    {
        initialRouteName: "Login"
    }
);

export default appNavigator;