import { StyleSheet } from "react-native"
const styles = StyleSheet.create({  
    container: {  
        
        flexDirection: 'row',
        backgroundColor: "white"  ,
        
    },  
    
    item: {    
       
        paddingTop: 15,  
        marginBottom:5,  
        paddingLeft:10,
        borderColor: '#c9c9c9',  
        
        flexWrap: 'wrap', 
        
    },  
    image: {
        borderRadius: 40,
        width: 40,
        height: 40,
      },
    separator:{  
        height: 0.5,  
        width: "100%",  
        backgroundColor: "#000",  
        marginBottom:0
    }
});  
  export default styles