import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5
    },
    image: {
        height: 75,
        width: 75,
        borderRadius: 10,
    },
    content: {
        marginLeft: 10
    },
    form: {
        fontSize: 12,
        color: "gray"
    }, 
    // date: {
    //     fontSize: 14,
    //     color: "gray"
    // },
    title: {
        fontSize: 16
    }
});

export default styles