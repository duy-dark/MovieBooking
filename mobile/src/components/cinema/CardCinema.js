import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from "../../styles/components/cinema/cardcinema"

const CardCinema = (props) => {
    const item = props.item
    const onPress = () => {
        props.navigation.navigate('CinemaDetailScreen', {nameCinema: item.key1})
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={{uri: 'http://loremflickr.com/g/50/50/paris'}}/>
            <View style={styles.item}>
                <Text style={{color: 'orange',fontSize: 16}}>{item.key1}</Text>
                <Text style={{color:'darkgray', fontSize: 13}}>{item.key2}</Text>
            </View>
        </TouchableOpacity> 
    )
}

export default CardCinema
