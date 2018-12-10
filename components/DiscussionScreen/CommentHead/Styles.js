import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    windowHead: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 180,
        padding: 10,
        marginBottom: 10
    },
    headContent: {
        flex: 8,
        flexDirection: 'column',
        marginLeft: 10,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        flex: 2,
        fontSize: 12,
        borderRadius: 4,
		borderWidth: 1,
		borderColor: '#d6d7da',
    },
    eventInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    userAction: {
        flex: 1,
        flexDirection: 'row',
    }
});

export default styles;