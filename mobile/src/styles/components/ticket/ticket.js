import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        borderWidth: 0.5, 
        borderStyle: "dashed", 
        borderRadius: 25, 
        borderTopRightRadius: 10, 
        borderBottomLeftRadius: 10, 
        padding: 15, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12
    },
    code: {
        color: "green", 
        fontWeight: "bold", 
        fontSize: 15
    },
    time: {
        color: "red", 
        fontWeight: "bold", 
        fontSize: 15
    },
    bold: {
        fontWeight: "bold"
    },
    view: {
        backgroundColor: "white",
        borderRadius: 10, 
        padding: 15
    }
});

export default styles