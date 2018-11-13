import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container :{
        flex : 1,
        borderWidth : 2 ,
        borderColor : 'rgba(0,0,0,0)',
        alignItems : 'center',
        justifyContent : 'center',
    },
	notSelected : {
        backgroundColor : '#FFFF00',
    },
    Selected : {
        backgroundColor : '#cccccc',
      },
  });

  export default styles;