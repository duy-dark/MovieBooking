import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-comingsoon" 
import moment from "moment"

const CardFilmComingSoon = (props) => {
    const date = moment(props.film.start_date).format("DD/MM")
    const image = { uri: props.film.url_avatar }
    const onPress = () => {
        props.navigation.navigate("TabInfomation", {
            nameFilm: props.film.name,
            film: props.film
        })
    }

    return (
        <ImageBackground style={styles.container} source={image} imageStyle={styles.image}>
            <TouchableOpacity style={styles.touch} onPress={onPress}>
                <View style={styles.content}>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default CardFilmComingSoon
