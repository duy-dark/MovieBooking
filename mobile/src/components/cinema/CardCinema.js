import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../styles/components/cinema/card-cinema'

const CardCinema = (props) => {
    const [showtimes, setShowtimes] = useState(false)
    const bookTicket = () => {
        props.navigation.navigate("BookTicketScreen")
    }

    return (
            <View>
                <TouchableWithoutFeedback onPress={() => setShowtimes(!showtimes)}>
                    <Text style={styles.cinema}>{props.title}</Text>
                </TouchableWithoutFeedback>
                {showtimes &&
                    <View style={styles.showtimes}>
                        <Text style={{color: "gray"}}>2D - Phụ đề</Text>
                        <View style={{flexDirection: "row"}}>           
                            <TouchableOpacity style={styles.hoursArea} onPress={bookTicket}>
                                <Text style={styles.hoursStart}>12:00</Text>
                                <Text style={styles.hoursEnd}>13:40</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hoursArea}>
                                <Text style={styles.hoursStart}>12:00</Text>
                                <Text style={styles.hoursEnd}>13:40</Text>
                            </TouchableOpacity>
                        </View>
   
                    </View>
                }
            </View>
    )
}

export default CardCinema
