import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import styles from '../../styles/components/notification/notification'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const Notification = (props) => {
    const film = props.film
    const onPress = () => {
        props.navigation.navigate("TabInfomation", {
            nameFilm: props.film.name,
            film: props.film
        })
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={{uri: film.url_avatar}}/>
            <Text style={{marginLeft: 10, flex: 1}}><Text style={styles.bold}>{film.name}</Text> sắp chiếu</Text>
            <Ionicons name="notifications" size={20} color="orangered"/>
        </TouchableOpacity>
             
    )
}

export default Notification
