import React, { useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import styles from '../../styles/views/comment/reviewfilm-screen'
import StarRating from 'react-native-star-rating'


const ReviewFilmScreen = () => {
    // const image = { uri: "" }
    const avatarReviewer = { uri: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/132855827_3327445237361772_7305091957233836118_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=s4r_8MOLOXUAX8g3h5y&_nc_ht=scontent.fsgn5-3.fna&oh=8893babdf97583fefc92305155f30638&oe=603880DE"}

    const [starCount, setStarCount] = useState(0)
    const onPressRating = (rating) => {
        setStarCount(rating)
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
                <Text style={styles.text}>{starCount}</Text>
            </View>
            <View style={styles.areaInput}>
                <Image style={styles.avatarReviewer} source={avatarReviewer} />
                <TextInput style={styles.input} placeholder="Viết trả lời..." />
            </View>
        </View>
    )
}

export default ReviewFilmScreen
