import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating'
import styles from "../../styles/components/film/cardfilm"

const CardFilm = (props) => {
    const image = { uri: props.film.url_avatar }
    const onPress = () => {
        props.navigation.navigate("FilmScreen", {
            nameFilm: props.film.name,
            idFilm: props.film._id,
        })
    }
    var rate_average = 0
    if(props.film.rate_average) {
        rate_average = props.film.rate_average.toFixed(1)
    }
    return (
        <TouchableOpacity style={styles.touch} onPress={onPress}>
            <View style={styles.content}>
                <Image style={styles.image} source={image} />
                <View style={styles.detail}>
                    <Text style={styles.title} numberOfLines={1}>{props.film.name}</Text>
                    <View style={styles.row}>
                        {/* <Text style={styles.ageText}>C16</Text> */}
                        <Text style={styles.durationText}>{props.film.long_time}p IMDb {props.film.imdb}</Text>
                    </View>
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>{rate_average}</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={'orangered'}
                            maxStars={5}
                            rating={rate_average / 2}
                            starSize={8}
                        />
                    </View>
                </View>
                <Text style={styles.bookText}>ĐẶT VÉ</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardFilm
