import React, { useState } from 'react'
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import styles from '../../styles/views/comment/tab-comments'
import StarRating from 'react-native-star-rating'
import CardCommentFilm from '../../components/comment/CardCommentFilm'

import { useSelector } from "react-redux"

const TabComments = (props) => {
    const object = useSelector((state) => state.films.comments)
    const [listComment, setListComment] = useState(object)
    const onPressReviewFilm = () => {
        props.navigation.navigate("ReviewFilmScreen", {
            filmId: props.filmId
        })
    }
    const indicator = useSelector((state) => state.films.loading)
    // const { rate_average = 0, comments = []} = object
    const rateAverage = listComment.rate_average.toFixed(1)
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.review}>
                <Text style={styles.reviewText}>{rateAverage}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={rateAverage / 2}
                    fullStarColor={"orangered"}
                    starSize={15}
                />
                <Text style={styles.countReview}>{listCommentk.rate_count} người đánh giá</Text> 
            </View>
            <TouchableOpacity style={styles.inputArea} onPress={onPressReviewFilm}>
                <Text style={styles.inputText}>Bạn nghĩ gì về phim này...</Text>
            </TouchableOpacity>
            {listComment.comments.length > 0 && listComment.comments.map((comment, index) => (
                <CardCommentFilm key={index} comment={comment} navigation={props.navigation} />
            ))}
        </ScrollView>
    )
}

export default TabComments
