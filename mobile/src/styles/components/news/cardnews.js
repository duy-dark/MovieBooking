import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: "lightgray",
        backgroundColor: "white", 
        marginBottom: 15
    },
    image: {
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: "cover"
    },
    content: {
        margin: 10
    },
    form: {
        fontSize: 14,
        color: "gray"
    }, 
    // date: {
    //     fontSize: 14,
    //     color: "gray"
    // },
    title: {
        fontSize: 27
    },
    detail: {
        fontSize: 14,
        color: "gray",
        paddingBottom: 10
    }
});

export default styles