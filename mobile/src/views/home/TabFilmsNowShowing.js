import React from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-nowshowing"
import CardFilmNowShowing from "../../components/film/CardFilmNowShowing"
const TabFilmsNowShowing = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
           <CardFilmNowShowing />
           <CardFilmNowShowing />
           <CardFilmNowShowing />
           <CardFilmNowShowing />
           <CardFilmNowShowing />
           <CardFilmNowShowing />
        </ScrollView>
    )
}

export default TabFilmsNowShowing
