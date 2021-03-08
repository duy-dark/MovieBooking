import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import styles from '../../styles/views/comment/tab-comments'
import StarRating from 'react-native-star-rating'
import CardCommentFilm from '../../components/comment/CardCommentFilm'
import { useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from '@react-navigation/native';
import { getComments } from '../../redux/films/actions'

const TabComments = (props) => {
    // const filmId = props.filmId
    // const dispatch = useDispatch()
    //  useFocusEffect(
    //     useCallback(() => {
    //       // Do something when the screen is focused
    //       dispatch(getComments(filmId))
    //       return () => {
    //         // Do something when the screen is unfocused
    //         // Useful for cleanup functions
    //       };
    //     }, [])
    //   );
    const onPressReviewFilm = () => {
        props.navigation.navigate("ReviewFilmScreen", {
            filmId: props.filmId
        })
    }
    const indicator = useSelector((state) => state.films.loading)
    const listComment = useSelector((state) => state.films.comments)
    const { rate_average = 0, comments = []} = listComment
    const rateAverage = rate_average.toFixed(1)
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
                <Text style={styles.countReview}>{listComment.rate_count} người đánh giá</Text> 
            </View>
            <TouchableOpacity style={styles.inputArea} onPress={onPressReviewFilm}>
                <Text style={styles.inputText}>Bạn nghĩ gì về phim này...</Text>
            </TouchableOpacity>
            {comments.length > 0 && comments.map((comment, index) => (
                <CardCommentFilm key={index} comment={comment} navigation={props.navigation} />
            ))}
        </ScrollView>
    )
}

export default TabComments
