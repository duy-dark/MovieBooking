import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../../styles/components/film/cardfilm-schedule'

const CardFilmSchedule = (props) => {
    const item = props.item
    const onPress = () => {
      props.navigation.navigate("BookTicketScreen")
    }

    return (
        <View style={styles.container}>
        <Text style={{flex: 1,marginLeft:15,marginTop:10}}>
          <Image style={styles.image} source={{uri: 'http://loremflickr.com/g/50/50/paris'}}/>
          <View style={styles.item}>
            <Text style={{color:'green'}}>{item.key1}</Text>
            <View style={{ flexDirection: "row"}}>
              <Text style={{backgroundColor:'red',color:'white',borderRadius:3,borderWidth: 0.2,overflow:"hidden"}}>{item.key2}</Text>
              <Text> - {item.key3}</Text>
            </View>
          </View>
        </Text>
        <Text style={{marginLeft:10,marginTop:10,color:'grey'}}>{item.key4}</Text>
        <View style={{ flexDirection: "row",marginLeft:10}}>
          {item.time.map( (schedule, index) => { 
            return (
              <TouchableOpacity onPress={onPress}
              key={index} style={{ flexDirection: "column",flexWrap: 'wrap',backgroundColor:'lightgrey',borderRadius:3,borderWidth: 0.01,overflow:"hidden",padding:8,marginTop:5,marginBottom: 15,marginRight:10}}>
                <Text style={{fontSize:20,textAlign:'center'}}>{schedule.start}</Text>
                <Text style={{fontSize:10,textAlign:'center'}}>{schedule.end}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    
    )
}

export default CardFilmSchedule
