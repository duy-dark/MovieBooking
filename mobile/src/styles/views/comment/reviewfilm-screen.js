import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    areaReview: {
        alignItems: "center"
    },
    text: {
        marginVertical: 20,
        color: "gray",
        fontSize: 15
    },
    avatarReviewer: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    areaInput: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingLeft: 10,
        alignItems: "center",
        borderTopWidth: 0.5,
        borderTopColor: "lightgray"
    },
    input: {
        flex: 1,
        marginLeft: 10,
        marginRight: 15,
        paddingLeft: 15,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: "lightgray",
        position: "relative",
    }
});

export default styles