import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from '../../styles/components/news/cardnews'

const CardNews = (props) => {
    const image = { uri: props.news.image }
    const onPress = () => {
        props.navigation.navigate("NewsDetails", {
            idNews: props.news._id
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={image} />
            <View style={styles.content}>
                {/* <Text style={styles.form}>KHUYẾN MÃI</Text> */}
                {/* <Text style={styles.date}>01:48 HÔM NAY</Text> */}
                <Text style={styles.title} numberOfLines={2}>{props.news.title}</Text>
                <Text style={styles.detail} numberOfLines={2}>{props.news.subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardNews
