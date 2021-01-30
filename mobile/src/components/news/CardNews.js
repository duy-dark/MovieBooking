import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from '../../styles/components/news/cardnews'

const CardNews = () => {
    const image = { uri: "https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg" }
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={image} />
            <View style={styles.content}>
                <Text style={styles.form}>KHUYẾN MÃI</Text>
                {/* <Text style={styles.date}>01:48 HÔM NAY</Text> */}
                <Text style={styles.title}>TIX 1K/VÉ NGẠI CHI GIÁ VÉ</Text>
                <Text style={styles.detail}>Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardNews
