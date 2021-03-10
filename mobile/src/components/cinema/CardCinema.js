import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from "../../styles/components/cinema/cardcinema"

const CardCinema = (props) => {
    const cinema = props.item
    const onPress = () => {
        props.navigation.navigate('CinemaDetailScreen', {
            nameCinema: cinema.name,
            idCinema: cinema._id
        })
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={{uri: cinema.url_image}}/>
            <View style={styles.item}>
                <Text style={{color: 'orange',fontSize: 16}}>{cinema.name}</Text>
                <Text style={{color:'darkgray', fontSize: 13}} numberOfLines={1}>{cinema.address}</Text>
            </View>
        </TouchableOpacity> 
    )
}

export default CardCinema
