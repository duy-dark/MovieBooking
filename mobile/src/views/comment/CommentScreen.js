import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import styles from '../../styles/views/comment/comment-screen'
import StarRating from 'react-native-star-rating'
import Icon from "react-native-vector-icons/FontAwesome"
import { useSelector } from 'react-redux'

const CommentScreen = () => {
    const user = useSelector((state) => state.users.user)

    const avatarReviewer = { uri: user.avatar}
    const imageFilm = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" }
    const icon = { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"}

    const [like, setLike] = useState(0)
    const [selectLike, setSelectLike] = useState(false)

    useEffect(() => {
        if(selectLike) {
            setLike(like + 1)
        }
        else if (like > 0) {
            setLike(like - 1)
        }
    }, [selectLike])
    return (
        <View style={styles.container}>
            <View style={styles.area}>
                <View style={styles.row}>
                    <View style={styles.reviewer}>
                        <View style={styles.containerImages}>
                            <Image style={styles.avatarReviewer} source={avatarReviewer} />
                            <Image style={styles.icon} source={icon} />
                        </View>
                        <View style={styles.reviewerInfo}>
                            <Text>Sơn Hứa</Text>
                            <Text style={styles.timeReviewer}>14 giờ trước</Text>
                        </View>
                    </View>           
                    <View style={styles.review}>
                        <Text style={styles.reviewText}>8.8</Text>
                        <StarRating 
                            disabled={true}
                            fullStarColor={"orangered"}
                            maxStars={4}
                            rating={4}
                            starSize={8}
                        />
                    </View>     
                </View>
                <View style={styles.comment}>
                    <Text>Phim hay</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={{flexDirection: "row"}} onPress={() => setSelectLike(!selectLike)}>
                        { selectLike 
                            ? <Icon name="thumbs-o-up" size={20} color="orangered" /> 
                            : <Icon name="thumbs-o-up" size={20} color="darkgray" />
                        }
                        <Text style={styles.iconText}>{like}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: "row"}}>
                        <Icon name="comment-o" size={20} />
                        <Text style={styles.iconText}>0</Text>
                    </View>
            </View>
            </View>
            <View style={styles.areaInput}>
                <Image style={styles.avatarReviewer} source={avatarReviewer} />
                <TextInput style={styles.input} placeholder="Viết trả lời..." />
                <TouchableOpacity style={styles.post}>
                    <Text style={{color: "dodgerblue"}}>Đăng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CommentScreen
