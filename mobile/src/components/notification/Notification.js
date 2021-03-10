import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import styles from '../../styles/components/notification/notification'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const Notification = (props) => {
    const film = props.film
    // const onPress = () => {
    //     props.navigation.navigate("TabInfomation", {
    //         nameFilm: props.film.name,
    //         // nameFilm: props.film.film_name,
    //         film: props.film
    //     })
    // }
    return (
        <TouchableOpacity style={styles.container}>
            {/* <Image style={styles.image} source={{uri: film.url_avatar}}/> */}
            <Image style={styles.image} source={{uri: film.film_avatar}}/>
            {/* <Text style={{marginLeft: 10, flex: 1}}><Text style={styles.bold}>{film.name}</Text> sắp chiếu</Text> */}
            <Text style={{marginLeft: 10, flex: 1}}>{film.content}</Text>
            <Ionicons name="notifications" size={20} color="orangered"/>
        </TouchableOpacity>
             
    )
}

export default Notification
