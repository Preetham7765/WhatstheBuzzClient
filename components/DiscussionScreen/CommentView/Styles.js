import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        
    },
    userInfoContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    userInfoText: {
        fontSize: 12,
        color: "#03A9F4",
        padding: 10,
        textAlign: 'right',
    },
    comment: {
        fontSize: 15,
        color: '#000',
        padding: 10,
        flex: 3,
    },
    reviewContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    ownerAction: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },

    card: {
        borderRadius: 10,
        padding: 8,
        margin: 4,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        minHeight: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowOpacity: 0.54,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },

    editComment: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#d6d7da',
    },
});

export default styles;