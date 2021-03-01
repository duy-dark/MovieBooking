import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from "../../styles/views/home/tabhome"
import CardFilmFavorite from "../../components/film/CardFilmFavorite"
import CardFilm from "../../components/film/CardFilm"
import CardNews from "../../components/news/CardNews"
import CardNewsSummary from "../../components/news/CardNewsSummary"
import CardCommment from "../../components/comment/CardComment"
import { useSelector, useDispatch } from "react-redux";
import { getListFilmNow } from "../../redux/films/actions"

const TabHome = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListFilmNow())
    }, [])

    const films = useSelector((state) => state.films.filmsNow)
    const filmsFavorite = films.slice(0, 3)
    const filmsSuggest = films.slice(3,6)
    const indicator = useSelector((state) => state.films.loading)

    const seeAllFilm = () => {
        props.navigation.navigate("TabFilmsNowShowing")
    }
    const seeAllNews = () => {
        props.navigation.navigate("NewsStack")
    }
    console.log(indicator, "abcdef")
    if(indicator == 0) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.section}>Phim được yêu thích nhất</Text>
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
