import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: "lightgray"
    },
    image: {
        height: 150,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
        color: "gray"
    }
});

export default styles