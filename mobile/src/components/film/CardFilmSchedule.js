import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../../styles/components/film/cardfilm-schedule'
import moment from 'moment'

const CardFilmSchedule = (props) => {
    const imageFilm = { uri: props.film.url_avatar}
    const onPress = (film_schedule) => {
      props.navigation.navigate("BookTicketScreen", {
        film: props.film,
        cinema: props.cinema,
        film_schedule: film_schedule
      })
    }

    return (
        <View style={styles.container}>
        <View style={{flex: 1,marginLeft:15,marginTop:10, flexDirection: "row", alignItems: "center"}}>
          <Image style={styles.image} source={imageFilm}/>
          <View style={styles.item}>
            <Text style={{color:'green'}}>{props.film.name}</Text>
            <View style={{ flexDirection: "row"}}>
              <Text style={{color:"gray"}}> {props.film.long_time} phút - Imdb {props.film.imdb}</Text>
            </View>
          </View>
        </View>
        <Text style={{marginLeft:10,marginTop:10,color:'grey'}}>{props.film.digitals}</Text>
        <View style={{ flexDirection: "row",marginLeft:10,  flexWrap: "wrap"}}>
          {props.film.film_schedules.map((film_schedule, index) => { 
            return (
              <TouchableOpacity onPress={() => onPress(film_schedule)}
              key={index} style={{ flexDirection: "column",flexWrap: 'wrap',backgroundColor:'lightgrey',borderRadius:3,borderWidth: 0.01,overflow:"hidden",padding:8,marginTop:5,marginBottom: 15,marginRight:10}}>
                <Text style={{fontSize:20,textAlign:'center'}}>{moment(film_schedule.time_start).format('LT')}</Text>
                <Text style={{fontSize:10,textAlign:'center'}}>{moment(film_schedule.time_end).format('LT')}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    
    )
}

export default CardFilmSchedule
