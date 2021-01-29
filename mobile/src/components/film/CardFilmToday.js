import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-today"
import StarRating from 'react-native-star-rating';


const CardFilmFavorite = () => {
    const image = { uri: "https://s3img.vcdn.vn/123phim/2021/01/lua-deu-gap-lua-dao-16105107337344.jpg" } ;
    return (
        <ImageBackground style={styles.container} source={image} imageStyle={styles.image}>
            <TouchableOpacity style={styles.touch}>
                <View style={styles.content}>
                    <Text style={styles.ageText}>C18</Text>
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>8.8</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={'orangered'}
                            maxStars={5}
                            rating={4}
                            starSize={10}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default CardFilmFavorite

