import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-favorite"
import StarRating from 'react-native-star-rating';


const CardFilmFavorite = (props) => {
    const image = { uri: props.film.url_background } 
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
            <TouchableOpacity 
                style={styles.touch} 
                onPress={onPress}
            >
                <View style={styles.content}>
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>{rate_average}</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={"orangered"}
                            maxStars={5}
                            rating={rate_average / 2}
                            starSize={10}
                        />
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.row}>
                            {/* <Text style={styles.ageText}>C16</Text> */}
                            <Text style={styles.statusText}>ĐANG CHIẾU</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.titleText} numberOfLines={2}>{props.film.name}</Text>
                            <Text style={styles.bookText}>ĐẶT VÉ</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default CardFilmFavorite

