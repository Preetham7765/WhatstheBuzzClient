import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    notSelected: {
        backgroundColor: '#cccccc',
    },
    Selected: {
        backgroundColor: '#FF0000',
    },
});

export default styles;