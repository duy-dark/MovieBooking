import React, { useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from "../../styles/views/home/tabhome"
import CardFilmFavorite from "../../components/film/CardFilmFavorite"
import CardFilm from "../../components/film/CardFilm"
import CardNews from "../../components/news/CardNews"
import CardNewsSummary from "../../components/news/CardNewsSummary"
// import CardCommment from "../../components/comment/CardComment"
import { useSelector, useDispatch } from "react-redux";
import { getListFilmFuture, getListFilmNow, getListFilmNowFavorite } from "../../redux/films/actions"
import { getListNews } from '../../redux/news/action'
import { useFocusEffect } from '@react-navigation/native'

const TabHome = (props) => {
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()
    useFocusEffect(
        useCallback(() => {
            dispatch(getListFilmNowFavorite(user._id))
            dispatch(getListNews())
            dispatch(getListFilmNow())
            dispatch(getListFilmFuture())
        }, [])
    )

    const films = useSelector((state) => state.films.filmsNow)
    const filmsNowFavorite = useSelector((state) => state.films.filmsNowFavorite)
    const filmsFavorite = filmsNowFavorite.slice(0, 3)
    const filmsSuggest = films.slice(3,6)
    const tempNews = useSelector((state) => state.news.newsList)
    const news = tempNews.map(item => {
        let arr = item.content.filter(val => val.image)
        return {
          ...item,
          image: arr[0].image,
          subtitle: item.content[0].text
        }
    })
    
    const newsHome = news.slice(0,3)
    const newsSummary = news.slice(3,6)

    const indicator = useSelector((state) => state.films.loading)

    const seeAllFilm = () => {
        props.navigation.navigate("TabFilmsNowShowing")
    }
    const seeAllNews = () => {
        props.navigation.navigate("NewsStack")
    }
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.section}>Phim đang chiếu có thể bạn sẽ thích</Text>
            {filmsFavorite.map((film, index) => 
                <CardFilmFavorite key={index} film={film} navigation={props.navigation} />
            )}
            <View style={styles.area}>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Rạp đang có phim gì?</Text>
                    <TouchableOpacity onPress={seeAllFilm}>
                        <Text style={styles.seeAll}>Xem Tất Cả</Text>
                    </TouchableOpacity>
                </View>
                {filmsSuggest.map((film, index) => 
                <CardFilm key={index} film={film} navigation={props.navigation} />
                )}
            </View>
            <Text style={styles.section}>Tin nóng nhất hôm nay</Text>
            {newsHome.map((news, index) => 
                <CardNews key={index} news={news} navigation={props.navigation} />
            )}
            <View style={styles.area}>
                <View style={styles.row}>
                    <Text style={styles.textRow}>Lướt thêm tin mới nhé!</Text>
                    <TouchableOpacity onPress={seeAllNews}><Text style={styles.seeAll}>Xem Tất Cả</Text></TouchableOpacity>
                </View>
                {newsSummary.map((news, index) => 
                    <CardNewsSummary key={index} news={news} navigation={props.navigation} />
                )}
            </View>
            {/* <View>
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
         */}
        </ScrollView>
    )
}

export default TabHome
