import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../styles/components/cinema/cardcinema-schedule'
import moment from 'moment'

const CardCinemaSchedule = (props) => {
    const imageCinema = { uri: props.cinema.url_image}
    const [showtimes, setShowtimes] = useState(false)
    const bookTicket = (film_schedule) => {
        props.navigation.navigate("BookTicketScreen", {
            film: props.film,
            cinema: props.cinema,
            film_schedule: film_schedule
        })
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setShowtimes(!showtimes)}>
                <View style={styles.cinema}>
                    <Image style={styles.imageCinema} source={imageCinema} />
                    <Text style={styles.nameCinema}>{props.cinema.name}</Text>
                </View>
            </TouchableWithoutFeedback>
            {showtimes &&
                <View style={styles.showtimes}>
                    <Text style={{color: "gray"}}>{props.film.digitals}</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        {props.cinema.film_schedules.map((film_schedule, index) => (
                            <TouchableOpacity key={index} style={styles.hoursArea} onPress={() => bookTicket(film_schedule)}>
                                <Text style={styles.hoursStart}>{moment(film_schedule.time_start).format('LT')}</Text>
                                <Text style={styles.hoursEnd}>{moment(film_schedule.time_end).format('LT')}</Text>
                            </TouchableOpacity>
                        ))
                        
                    }
                    </View>

                </View>
            }
        </View>
    )
}

export default CardCinemaSchedule
