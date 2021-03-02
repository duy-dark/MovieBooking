import React from 'react'
import { ScrollView, View, Text, ActivityIndicator } from 'react-native'
import styles from '../../styles/views/comment/tab-comments'
import StarRating from 'react-native-star-rating'
import CardCommentFilm from '../../components/comment/CardCommentFilm'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from "react-redux"

const TabComments = (props) => {
    const onPressReviewFilm = () => {
        props.navigation.navigate("ReviewFilmScreen", {
            filmId: props.filmId
        })
    }
    const indicator = useSelector((state) => state.films.loading)

    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.review}>
                <Text style={styles.reviewText}>{props.rate_average}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={props.rate_average / 2}
                    fullStarColor={"orangered"}
                    starSize={15}
                />
                <Text style={styles.countReview}>{props.rate_count} người đánh giá</Text>
            </View>
            <TouchableOpacity style={styles.inputArea} onPress={onPressReviewFilm}>
                <Text style={styles.inputText}>Bạn nghĩ gì về phim này...</Text>
            </TouchableOpacity>
            {/* <CardCommentFilm navigation={props.navigation} />
            <CardCommentFilm navigation={props.navigation} />
            <CardCommentFilm navigation={props.navigation} />
            <CardCommentFilm navigation={props.navigation} /> */}
            {props.comments.map((comment, index) => (
                <CardCommentFilm key={index} comment={comment} navigation={props.navigation} />
            ))}
        </ScrollView>
    )
}

export default TabComments
