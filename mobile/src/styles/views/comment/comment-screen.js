import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    area: {
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgray"
    },
    row: {
        flexDirection: "row",
        marginVertical: 10,
        marginLeft: 10,
        alignItems: "center"
    },
    reviewer: {
        flex: 1,
        flexDirection: "row"
    },
    containerImages: {
        position: "relative",
    },
    avatarReviewer: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    icon: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 12,
        height: 12,
        borderRadius: 50
    },
    reviewerInfo: {
        marginLeft: 10
    },
    timeReviewer: {
        fontSize: 11,
        color: "darkgray"
    },
    review: {
        marginRight: 10
    },
    reviewText: {
        fontSize: 16,
        textAlign: "center",
        color: "green",
    },
    comment: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        paddingBottom: 15,
        paddingTop: 5,
        paddingLeft: 10
    },
    iconText: {
        alignSelf: "center",
        marginLeft: 5,
        marginRight: 15,
        color: "darkgray"
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
    },
    post: {
        position: "absolute",
        right: 25
    }
});

export default styles