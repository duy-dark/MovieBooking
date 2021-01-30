import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        height: 150,
    },
    image: {
        borderRadius: 15,
        resizeMode: "cover",
    },
    touch: {
        flex: 1
    },
    content: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 7,
        alignItems: "center"
    },
    ageText: {
        backgroundColor: "orangered",
        borderRadius: 3,
        fontSize: 12,
        color: "white",
        padding: 2,
        marginRight: 5
    },
    review: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "gray",
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 3,
    },
    reviewText: {
        fontSize: 15,
        textAlign: "center",
        color: "white",
    },


});

export default styles