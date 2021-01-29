import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from "../../styles/components/comment/cardcomment"
import StarRating from 'react-native-star-rating'
import Icon from "react-native-vector-icons/FontAwesome"

const CardComment = () => {
    const avatarReviewer = { uri: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/132855827_3327445237361772_7305091957233836118_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=s4r_8MOLOXUAX8g3h5y&_nc_ht=scontent.fsgn5-3.fna&oh=8893babdf97583fefc92305155f30638&oe=603880DE"}
    const imageFilm = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity>
                    <Text style={styles.nameFilm}>Lừa Đểu Gặp Lừa Đảo</Text>
                    <StarRating 
                        disabled={true}
                        fullStarColor={"orangered"}
                        maxStars={5}
                        rating={4}
                        starSize={2}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Text style={styles.nameReviewer}>Sơn Hứa</Text>
                        <Text style={styles.time}></Text>
                    </View>
                    <Image style={styles.avatarReviewer} source={avatarReviewer} />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Image style={styles.imageFilm} source={imageFilm} />
                <Text style={styles.contentComment}>Phim hay</Text>
            </View>
           <TouchableOpacity style={styles.row}>
                <Icon name="like" size={30} />
                <Text styles={styles.iconText}>Thích</Text>
                <Icon name="comment" size={30} />
                <Text styles={styles.iconText}>Bình Luận</Text>
           </TouchableOpacity>
        </View>
    )
}

export default CardComment
