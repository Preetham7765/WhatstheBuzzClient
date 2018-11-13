import { StyleSheet, Dimensions } from 'react-native';

const screenW = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.5)'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        height: 150,
        width: screenW * 0.75,
        backgroundColor: 'rgb(234, 234, 235)',
        borderRadius: 5,
    },
    promptContainer: {
        height: 100,
        width: screenW * 0.75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 50,
        width: screenW * 0.75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#d9d9d9'
    },
    line: {
        height: 46,
        width: 1,
        backgroundColor: '#d9d9d9'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;