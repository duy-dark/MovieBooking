import React from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-comingsoon"
import CardFilmComingSoon from "../../components/film/CardFilmComingSoon"

const TabInfomation = () => {
    return (
        <ScrollView style={styles.view} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
            <CardFilmComingSoon />
        </ScrollView>
    )
}

export default TabInfomation
