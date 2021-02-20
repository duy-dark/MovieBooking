import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-nowshowing"
import StarRating from 'react-native-star-rating';


const CardFilmNowShowing = (props) => {
    const image = { uri: "https://s3img.vcdn.vn/123phim/2021/01/lua-deu-gap-lua-dao-16105107337344.jpg" } ;
    const onPress = () => {
        props.navigation.navigate("FilmScreen", {nameFilm: "Lừa Đểu Gặp Lừa Đảo"})
    }
    return (
        <ImageBackground style={styles.container} source={image} imageStyle={styles.image}>
            <TouchableOpacity style={styles.touch} onPress={onPress}>
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

export default CardFilmNowShowing

