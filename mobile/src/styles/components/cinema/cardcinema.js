import { StyleSheet } from "react-native"
const styles = StyleSheet.create({  
    container: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    },  
    item: {
        marginLeft: 10
    },  
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 50
    }
});  
  export default styles