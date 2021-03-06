import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eeeeee",
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    section: {
        fontSize: 17,
        marginBottom: 15
    },
    area: {
        backgroundColor: "white",
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: "lightgray"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
    },
    textRow : {
        fontSize: 17,
    },
    seeAll: {
        fontSize: 15,
        color: "orangered"
    },
});

export default styles