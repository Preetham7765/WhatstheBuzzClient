import { StyleSheet } from 'react-native';

const formStyles = {
  ...styles,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  dateInput: {
    padding: 60,
    alignItems: 'flex-start'
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default styles;