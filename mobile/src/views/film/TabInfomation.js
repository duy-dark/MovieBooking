import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import styles from '../../styles/views/film/tab-infomation'

const TabInfomation = () => {
    const image = { uri: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/tch_poster_vn_final.jpg.jpg" }
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={image}/>
            <View style={{ padding: 10 }}>
                <Text style={styles.nameFilm}>The Con-Hertist</Text>
                <View></View>
                <Text style={styles.contentText}>Nội dung</Text>
                <Text style={styles.contentFilm}>Siêu phẩm phim điện ảnh Thái Lan mùa cuối năm 2020: Baifern Pimchanok hóa cô nàng si tình, vì tình mà bị lừa tiền còn Nadech là một kẻ lừa đảo chuyên nghiệp với tài ăn nói khéo léo.</Text>
                <Text style={styles.contentFilm}>QGSX: Thái Lan</Text>
            </View>
        </ScrollView>
    )
}

export default TabInfomation
