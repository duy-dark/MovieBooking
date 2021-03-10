import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from "../../styles/components/comment/cardcomment"
import StarRating from 'react-native-star-rating'
import Icon from "react-native-vector-icons/FontAwesome"

const CardComment = (props) => {
    const avatarReviewer = { uri: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/132855827_3327445237361772_7305091957233836118_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=s4r_8MOLOXUAX8g3h5y&_nc_ht=scontent.fsgn5-3.fna&oh=8893babdf97583fefc92305155f30638&oe=603880DE"}
    const imageFilm = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" }
    const icon = { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"}
    const handleClickComment = () => {
        props.navigation.navigate("CommentScreen")
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.film}>
                    <Text style={styles.nameFilm}>Lừa Đểu Gặp Lừa Đảo</Text>
                    <StarRating 
                        style={styles.starFilm}
                        disabled={true}
                        fullStarColor={"orangered"}
                        maxStars={4}
                        rating={4}
                        starSize={9}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.reviewer}>
                    <View style={styles.reviewerInfo}>
                        <Text style={styles.nameReviewer}>Sơn Hứa</Text>
                        <Text style={styles.timeReviewer}>14 giờ trước</Text>
                    </View>
                    <View style={styles.containerImages}>
                        <Image style={styles.avatarReviewer} source={avatarReviewer} />
                        <Image style={styles.icon} source={icon} />
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.row}>
                <Image style={styles.imageFilm} source={imageFilm} />
                <Text style={styles.contentComment}>Phim hay</Text>
            </TouchableOpacity>
           <TouchableOpacity style={styles.row} onPress={handleClickComment}>
                <Icon name="thumbs-o-up" size={20} color="darkgray" />
                <Text style={styles.iconText}>0 Thích</Text>
                <Icon name="comment-o" size={20} color="darkgray" />
                <Text style={styles.iconText}>0 Bình Luận</Text>
           </TouchableOpacity>
        </View>
    )
}

export default CardComment
