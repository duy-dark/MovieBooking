import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        height: 220,
        width: "50%"
    },
    image: {
        borderRadius: 10,
        resizeMode: "cover",
        width: "100%"
    },
    touch: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    content: {
        margin: 7,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 5,
        padding: 3
    },
    dateText: {
        fontSize: 14,
        color: "white"
    }
});

export default styles