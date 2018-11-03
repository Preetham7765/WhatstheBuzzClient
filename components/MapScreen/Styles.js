import { StyleSheet } from 'react-native';
    
const styles = StyleSheet.create({
    mapContainer: {
        width:'100%',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    tooltipView:{
        padding: 10,
        backgroundColor:"#fff"
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});

export default styles;