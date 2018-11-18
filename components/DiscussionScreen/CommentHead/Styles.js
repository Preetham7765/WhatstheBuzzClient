import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    windowHead: {
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 150,
      padding : 10,  
    },
    headContent: {
        flex : 8,
        flexDirection : 'column',
    },
    title: {
        flex : 1,
        fontSize: 30,
        fontWeight: 'bold',
    },
    decription : {
        flex : 2,
        fontSize: 12,
    },
    eventInfo :{
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'space-around',
        alignItems : 'center',
    },
    userAction : {
      flex : 1,
      flexDirection : 'row',
      justifyContent: 'space-around', 
    }
  });

  export default styles;