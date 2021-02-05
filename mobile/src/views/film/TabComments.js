import React from 'react'
import { ScrollView, View, Text, TextInput } from 'react-native'
import styles from '../../styles/views/comment/tab-comments'
import StarRating from 'react-native-star-rating'
import CardCommentFilm from '../../components/comment/CardCommentFilm'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TabComments = () => {
    return (
        <ScrollView>
            <View style={styles.review}>
                <Text style={styles.reviewText}>8.8</Text>
                <StarRating
                    disabled={true}
                    maxStars={4}
                    rating={4}
                    fullStarColor={"orangered"}
                    starSize={15}
                />
                <Text style={styles.countReview}>76 Người đánh giá</Text>
            </View>
            <TouchableOpacity style={styles.inputArea}>
                <Text style={styles.inputText}>Bạn nghĩ gì về phim này...</Text>
            </TouchableOpacity>
            <CardCommentFilm />
            <CardCommentFilm />
            <CardCommentFilm />
            <CardCommentFilm />
        </ScrollView>
    )
}

export default TabComments
