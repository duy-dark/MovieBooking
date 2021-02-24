import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    review: {
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 10
    },
    reviewText: {
        fontSize: 25,
        color: "limegreen",
        marginVertical: 5
    },
    countReview: {
        color: "darkgray",
        marginVertical: 5
    },
    inputArea: {
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10
    },
    inputText: {
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "lightgray",
        color: "darkgray",
        padding: 5,
        paddingLeft: 15
    }
});

export default styles