import React from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-comingsoon"
import CardFilmComingSoon from "../../components/film/CardFilmComingSoon"

const TabFilmsComingSoon = () => {
    return (
        <ScrollView style={styles.view} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <CardFilmComingSoon />
            <CardFilmComingSoon />
            <CardFilmComingSoon />
            <CardFilmComingSoon />
            <CardFilmComingSoon />
            <CardFilmComingSoon />
            <CardFilmComingSoon />
            <CardFilmComingSoon />
        </ScrollView>
    )
}

export default TabFilmsComingSoon
