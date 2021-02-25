import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", 
    borderTopWidth: 0.5, 
    borderTopColor: "lightgray"
  },
  scene: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  item: {    
    marginTop:10,  
    paddingLeft:10,
    borderColor: '#c9c9c9',  
    flexWrap: 'wrap', 
  },
  image: {
    paddingLeft:10,
    borderRadius: 5,
    width: 35,
    height: 45,
  },
});

export default styles