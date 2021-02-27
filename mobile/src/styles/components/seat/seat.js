import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    seat: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: 21,
        width: 22.5,
        margin: 3.75,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderBottomLeftRadius: 7.5,
        borderBottomRightRadius: 7.5,
        borderColor: "#3e515d",
    },
    seatImage: {
        height: 16.5,
        width: 15,
        fontSize: 12,
        color: "white",
        backgroundColor: "#3e515d",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    }
});

export default styles