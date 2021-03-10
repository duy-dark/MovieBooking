import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        padding: 10, 
        alignItems: "center", 
        flexDirection: "row", 
        borderRadius: 15, 
        marginBottom: 10
    },
    image: {
        height: 50, 
        width: 50, 
        borderRadius: 50
    },
    bold: {
        fontWeight: "bold",
        color: "black"
    },
    view: {
        backgroundColor: "white",
        borderRadius: 10, 
        padding: 15
    }
});

export default styles