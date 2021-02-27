import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import styles from '../../styles/views/film/tab-infomation'
import { WebView } from 'react-native-webview'
import moment from "moment"

const TabInfomation = (props) => {
    var film
    if (props.route) {
        film = props.route.params.film
    }
    else {
        film = props.film
    }
    const date = moment(film.start_date).format("DD/MM")

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <WebView
                scalesPageToFit={true}
                bounces={false}
                javaScriptEnabled
                style={{ height: 220, width: "150%" }}
                source={{html: film.trailer}}
                automaticallyAdjustContentInsets={false}
            />
            <View style={{ padding: 10 }}>
                <Text style={styles.nameFilm}>{film.name}</Text>
                <View style={{marginVertical: 10}}>
                    <Text style={styles.contentFilm}>{date} - {film.long_time} phút - IMDb {film.imdb}</Text>
                </View>
                <Text style={styles.contentText}>Nội dung</Text>
                <Text style={styles.contentFilm}>{film.content}</Text>
                <Text style={styles.contentFilm}>Đạo diễn: {film.directors}</Text>
                <Text style={styles.contentFilm}>QGSX: {film.countries}</Text>
            </View>
        </ScrollView>
    )
}

export default TabInfomation
