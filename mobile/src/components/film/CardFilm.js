import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating'
import styles from "../../styles/components/film/cardfilm"

const CardFilm = () => {
    const image = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg"}
    return (
        <TouchableOpacity style={styles.touch}>
            <View style={styles.content}>
                <Image style={styles.image} source={image} />
                <View style={styles.detail}>
                    <Text style={styles.title} numberOfLines={1}>Lừa Đểu Gặp Lừa Đảo</Text>
                    <View style={styles.row}>
                        <Text style={styles.ageText}>C16</Text>
                        <Text style={styles.durationText}>104p IMDb 0.0</Text>
                    </View>
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>8.8</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={'orangered'}
                            maxStars={5}
                            rating={4}
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
