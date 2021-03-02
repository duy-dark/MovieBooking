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
    paddingHorizontal:10,
    borderColor: '#c9c9c9',
    flex: 1
  },
  image: {
    paddingLeft:10,
    borderRadius: 5,
    width: 50,
    height: 50,
  },
});

export default styles