import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
	voteContainer: {
		flex: 1,
		alignItems: 'stretch',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},

	voteButton: {
		backgroundColor: '#FFFFFF',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1,
	},

	marked: {
		color : "blue",
	},

	unMarked: {
		color : "#DDDDDD",
	},
});

export default styles;