import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from "../../styles/views/home/tabhome"
import CardFilmFavorite from "../../components/film/CardFilmFavorite"
import CardFilm from "../../components/film/CardFilm"
import CardNews from "../../components/news/CardNews"
import CardNewsSummary from "../../components/news/CardNewsSummary"
import CardCommment from "../../components/comment/CardComment"

const TabHome = (props) => {
    const seeAllFilm = () => {
        props.navigation.navigate("TabFilmsNowShowing")
    }
    const seeAllNews = () => {
        props.navigation.navigate("NewsStack")
    }


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.section}>Phim được yêu thích nhất</Text>
            <CardFilmFavorite navigation={props.navigation} />
            <CardFilmFavorite navigation={props.navigation} />
            <CardFilmFavorite navigation={props.navigation} />
            <View style={styles.area}>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Rạp đang có phim gì?</Text>
                    <TouchableOpacity onPress={seeAllFilm}>
                        <Text style={styles.seeAll}>Xem Tất Cả</Text>
                    </TouchableOpacity>
                </View>
                <CardFilm navigation={props.navigation} />
                <CardFilm navigation={props.navigation} />
                <CardFilm navigation={props.navigation} />
            </View>
            <Text style={styles.section}>Tin nóng nhất hôm nay</Text>
            <CardNews />
            <CardNews />
            <CardNews />
            <View style={styles.area}>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Lướt thêm tin mới nhé!</Text>
                    <TouchableOpacity onPress={seeAllNews}><Text style={styles.seeAll}>Xem Tất Cả</Text></TouchableOpacity>
                </View>
                <CardNewsSummary />
                <CardNewsSummary />
                <CardNewsSummary />
                <CardNewsSummary />
                <CardNewsSummary />
            </View>
            <View>
                <View style={[styles.row, {marginBottom: 15}] }>
                    <Text style={styles.textRow}>Cộng đồng bình luận phim</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>Xem Tất Cả</Text></TouchableOpacity>
                </View>
                <CardCommment navigation={props.navigation} />
                <CardCommment navigation={props.navigation} />
                <CardCommment navigation={props.navigation} />
                <CardCommment navigation={props.navigation} />
                <CardCommment navigation={props.navigation} />
            </View>
        </ScrollView>
    )
}

export default TabHome
