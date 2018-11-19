import { StyleSheet }  from 'react-native';

const styles = StyleSheet.create({
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        borderWidth: 4,
        borderColor: '#d6d7da'
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressView: {
        marginTop: 20,
    }
});

export default styles;