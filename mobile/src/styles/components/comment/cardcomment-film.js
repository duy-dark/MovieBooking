import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: "lightgray",
    },
    row: {
        flexDirection: "row",
        marginVertical: 10,
        marginLeft: 10
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
    nameReviewer: {
        fontSize: 13,
        color: "gray"
    },
    timeReviewer: {
        fontSize: 11,
        color: "lightgray"
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
        fontSize: 12,
        color: "darkgray"
    }
});

export default styles