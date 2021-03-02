import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from "../../styles/components/comment/cardcomment-film"
import StarRating from 'react-native-star-rating'
import Icon from "react-native-vector-icons/FontAwesome"
import moment from "moment"

const CardCommentFilm = (props) => {
    const avatarReviewer = { uri: props.comment.customers.avatar}
    const imageFilm = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" }
    const icon = { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"}
    const handleClickComment = () => {
        alert("Cập nhật sắp tới")
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.reviewer}>
                    <View style={styles.containerImages}>
                        <Image style={styles.avatarReviewer} source={avatarReviewer} />
                        {/* <Image style={styles.icon} source={icon} /> */}
                    </View>
                    <View style={styles.reviewerInfo}>
                        <Text style={styles.nameReviewer}>{props.comment.customers.name}</Text>
                        <Text style={styles.timeReviewer}>{moment(props.comment.customers.created_at).startOf('day').fromNow()}</Text>
                    </View>
                </View>           
                <View style={styles.review}>
                    <Text style={styles.reviewText}>{props.comment.rate}</Text>
                    <StarRating 
                        disabled={true}
                        fullStarColor={"orangered"}
                        maxStars={5}
                        rating={props.comment.rate / 2}
                        starSize={8}
                    />
                </View>     
               </View>
            <View style={styles.comment}>
                <Text>{props.comment.content}</Text>
            </View>
           <TouchableOpacity style={styles.row} onPress={handleClickComment}>
                <Icon name="thumbs-o-up" size={20} color="darkgray" />
                <Text style={styles.iconText}>0 Thích</Text>
                <Icon name="comment-o" size={20} color="darkgray" />
                <Text style={styles.iconText}>0 Bình Luận</Text>
           </TouchableOpacity>
        </View>
    )
}

export default CardCommentFilm
