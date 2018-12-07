import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#ecf0f1",
    width: "100%"
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: 300,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#ecf0f1",
    width: "80%",
    backgroundColor: "rgba(255,255,255,.8)",
    padding: 10
  },
  input: {
    width: "80%",
    margin: 15,
    height: 40,
    padding: 10,
    //borderColor: '#7a42f4',
    borderWidth: 1
  },

  statusBar: {
    height: 24
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    height: 56,
    flex: 1
  }
});

export default styles;
