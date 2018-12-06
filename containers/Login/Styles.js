import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
    //backgroundColor: "#ecf0f1",
    width: "100%"
  },
  outerContainer: {
    position: "absolute",
    left: 50,
    top: 50,
    width: 300,
    height: 300
  },
  inputTopContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.8)",
    padding: 10
  },
  inputMiddleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },

  middleContainer: {
    position: "absolute",
    left: 50,
    top: 450,
    backgroundColor: "rgba(255,255,255,.8)",
    width: 300,
    height: 100
  },

  bottomContainer: {
    position: "absolute",
    left: 50,
    top: 550,
    backgroundColor: "rgba(255,255,255,.7)",
    width: 300,
    height: 80,
    alignItems: "center"
  },
  input: {
    width: "80%",
    margin: 15,
    height: 40,
    padding: 10,
    //borderColor: '#7a42f4',
    borderWidth: 1
  },
  buttonContainer: {
    //flex: 1,
    width: 120,
    height: 70,
    padding: 10
  },
  inputButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statusBar: {
    height: 24
  },
  titleText: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    textAlignVertical: "center"
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
