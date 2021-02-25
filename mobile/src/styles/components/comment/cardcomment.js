import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: "lightgray",
        borderRadius: 15,
        backgroundColor: "white",
        marginBottom: 15
    },
    row: {
        flexDirection: "row",
        marginVertical: 10
    },
    film: {
        flex: 3,
        alignItems: "flex-start"
    },
    nameFilm : {
        fontSize: 15
    },
    imageFilm: {
        width: 50,
        height: 70
    },
    reviewer: {
        flex: 2,
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    reviewerInfo: {
        flex: 1,
        alignItems: "flex-end"
    },
    nameReviewer: {
        fontSize: 13,
        color: "gray"
    },
    timeReviewer: {
        fontSize: 11,
        color: "lightgray"
    },
    containerImages: {
        position: "relative"
    },
    avatarReviewer: {
        height: 30,
        width: 30,
        borderRadius: 50,
        marginLeft: 5
    },
    icon: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 12,
        height: 12,
        borderRadius: 50
    },
    contentComment: {
        marginLeft: 5
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