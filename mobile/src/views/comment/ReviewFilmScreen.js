import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import styles from '../../styles/views/comment/reviewfilm-screen'
import StarRating from 'react-native-star-rating'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/films/actions'


const ReviewFilmScreen = (props) => {
    const user = useSelector((state) => state.users.user)
    const filmId = props.route.params.filmId

    const avatarReviewer = { uri: user.avatar}

    const [starCount, setStarCount] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)
    const [value, onChangeText] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        setIsDisabled(!(value.length > 0 && starCount > 0))
    }, [value, starCount])

    const onPressRating = (rating) => {
        setStarCount(rating)
    }
    const postComment = () => {
        const params = {
            film_id: filmId,
            customer_id: user._id,
            content: value,
            rate: starCount*2,
        }
        dispatch(createComment(params, props.navigation))
    }

    return (
        <View style={styles.container}>
            <View style={styles.areaReview}>
                {/* <Image source={image} /> */}
                <Text style={styles.text}>Đánh giá phim này</Text>
                <StarRating
                    maxStars={5}
                    starSize={30}
                    fullStarColor={"orangered"}
                    rating={starCount}
                    selectedStar={onPressRating}
                />
                <Text style={styles.text}>{starCount*2}/10</Text>
            </View>
            <View style={styles.areaInput}>
                <Image style={styles.avatarReviewer} source={avatarReviewer} />
                <TextInput style={styles.input} placeholder="Viết trả lời..." value={value} onChangeText={text => onChangeText(text)}/>
                <TouchableOpacity onPress={postComment} disabled={isDisabled}>
                    <Text style={{marginRight: 15, fontSize: 16, color: "#3b5998"}}>Đăng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReviewFilmScreen
