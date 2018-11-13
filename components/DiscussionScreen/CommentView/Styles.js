import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bodyContainer : {
        flex : 1,
        justifyContent : 'flex-start',
    },
    container:{
        flex : 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    userInfoContainer:{
        flex : 1,
        flexDirection: 'column',
    },
    userInfoText:{
        fontSize: 15,
        color: "#03A9F4",
        padding: 10,
        textAlign: 'right',
    },
    comment:{
        fontSize: 20,
        color: '#000',
        padding: 10,
    },
    reviewContainer:{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    card: {
        borderRadius: 2,
        padding: 8,
        margin: 4,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        minHeight: 76,
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowOpacity: 0.54,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
});

export default styles;