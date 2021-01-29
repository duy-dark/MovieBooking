import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import styles from "../../styles/components/film/cardfilm-favorite"
import StarRating from 'react-native-star-rating';


const CardFilmFavorite = () => {
    const image = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" } ;
    return (
        <ImageBackground style={styles.container} source={image} imageStyle={styles.image}>
            <TouchableOpacity style={styles.touch}>
                <View style={styles.content}>
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>8.8</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={"orangered"}
                            maxStars={5}
                            rating={4}
                            starSize={10}
                        />
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.row}>
                            <Text style={styles.ageText}>C16</Text>
                            <Text style={styles.statusText}>ĐANG CHIẾU</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.titleText}>LỪA ĐỂU GẶP LỪA ĐẢO</Text>
                            <Text style={styles.bookText}>ĐẶT VÉ</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default CardFilmFavorite

