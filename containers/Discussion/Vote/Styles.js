import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	voteContainer: {
		flex: 1,
		alignItems: 'stretch',
		flexDirection: 'column',
		justifyContent: 'center',
	},

	marked: {
		backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},

	unMarked: {
		backgroundColor: '#DDDDDD',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});

export default styles;