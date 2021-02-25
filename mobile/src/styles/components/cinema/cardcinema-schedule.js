import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    cinema: {
        fontSize: 15,
        paddingVertical: 20, 
        paddingLeft: 10,
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderTopColor: "lightgray"
    },
    showtimes: {
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },
    hoursArea: {
        backgroundColor: "#eeeeee",
        borderWidth: 0.5,
        borderColor: "lightgray",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        alignItems: "center",
        marginRight: 10
    },
    hoursStart: {
        fontSize: 16,
        fontWeight: "bold"
    },
    hoursEnd: {
        fontSize: 12,
        color: "gray"
    }
});

export default styles