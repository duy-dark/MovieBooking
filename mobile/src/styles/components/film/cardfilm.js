import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    touch: {
        flex: 1
    },
    content: {
        flexDirection:"row",
        alignItems: "center"
    },
    image: {
        height: 75,
        width: 75,
        borderRadius: 10
    },
    detail: {
        flex: 2,
        marginLeft: 10
    },
    title: {
        fontSize: 16,
        marginVertical: 5
    },
    row: {
        flexDirection: "row",
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
    durationText: {
        color: "darkgray",
        fontSize: 13
    },
    review: {
        alignSelf: "flex-start",
        borderRadius: 8,
        backgroundColor: "darkgray",
        padding: 3,
        marginVertical: 5
    },
    reviewText: {
        fontSize: 13,
        textAlign: "center",
        color: "white",
    },
    bookText: {
        flex: 1,
        backgroundColor: "orangered",
        color: "white",
        textAlign: "center",
        borderRadius: 5,
        paddingVertical: 2
    }
})

export default styles