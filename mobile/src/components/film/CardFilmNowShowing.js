import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-nowshowing"
import StarRating from 'react-native-star-rating';


const CardFilmNowShowing = (props) => {
    const image = { uri: props.film.url_background } ;
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
        <ImageBackground style={styles.container} source={image} imageStyle={styles.image}>
            <TouchableOpacity style={styles.touch} onPress={onPress}>
                <View style={styles.content}>
                    {/* <Text style={styles.ageText}>C18</Text> */}
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>{rate_average}</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={'orangered'}
                            maxStars={5}
                            rating={rate_average / 2}
                            starSize={10}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default CardFilmNowShowing

