import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-comingsoon" 

const CardFilmComingSoon = () => {
    const image = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" }
    // const image = { uri: props.film.url_avatar}
    return (
        <ImageBackground style={styles.container} source={image} imageStyle={styles.image}>
            <TouchableOpacity style={styles.touch}>
                <View style={styles.content}>
                    <Text style={styles.dateText}>28/01</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default CardFilmComingSoon
