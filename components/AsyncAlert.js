import { Alert } from 'react-native';

const asyncAlert = async (content) => new Promise((resolve) => {
    Alert.alert(
        'Alert',
        content,
        [
            {
                text: 'Cancel',
                onPress: () => {
                    resolve('no')
                }, style: 'cancel'
            },
            {
                text: 'ok',
                onPress: () => {
                    resolve('yes');
                },
            },
        ],
        { cancelable: false },
    );
});

export default asyncAlert;