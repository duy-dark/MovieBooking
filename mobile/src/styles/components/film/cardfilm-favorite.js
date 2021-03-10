import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        height: 300,
        marginBottom: 15
    },
    image: {
        borderRadius: 20,
        resizeMode: "cover",
    },
    touch: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: "space-between"
    },
    review: {
        alignSelf: "flex-end",
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "gray",
        margin: 15,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 3,
    },
    reviewText: {
        fontSize: 15,
        textAlign: "center",
        color: "white",
    },
    detail: {
        backgroundColor: "rgba(0,0,0,0.7)",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 25,
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    ageText: {
        backgroundColor: "orangered",
        borderRadius: 5,
        fontSize: 14,
        color: "white",
        padding: 2
    },
    statusText: {
        // marginLeft: 10,
        fontSize: 14,
        color: "white",
        opacity: 0.7,
    },
    titleText: {
        flex: 3,
        fontSize: 22,
        overflow: "hidden",
        color: "white",
    },
    bookText: {
        flex: 1,
        alignSelf: "flex-end",
        backgroundColor: "orangered",
        borderRadius: 7,
        color: "white",
        textAlign: "center",
        fontSize: 15,
        padding: 5
    }


});

export default styles