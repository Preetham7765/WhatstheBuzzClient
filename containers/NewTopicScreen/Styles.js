import { StyleSheet } from 'react-native';

const formStyles = {
  ...styles,
  formGroup: {
    normal: {
      marginBottom: 10,
    },
  },
  dateInput: {
    padding: 60,
    alignItems: 'flex-start',
  },
  controlLabel: {
    normal: {
      color: "white",
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
    padding: 20,
    backgroundColor: "#E2E9F4",
  },

  button: {
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 12,
  },

  createText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  },
});

export default styles;