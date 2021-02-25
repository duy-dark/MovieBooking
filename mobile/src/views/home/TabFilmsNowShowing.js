import React from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-nowshowing"
import CardFilmNowShowing from "../../components/film/CardFilmNowShowing"
const TabFilmsNowShowing = (props) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
           <CardFilmNowShowing navigation={props.navigation} />
           <CardFilmNowShowing navigation={props.navigation} />
           <CardFilmNowShowing navigation={props.navigation} />
           <CardFilmNowShowing navigation={props.navigation} />
           <CardFilmNowShowing navigation={props.navigation} />
           <CardFilmNowShowing navigation={props.navigation} />
        </ScrollView>
    )
}

export default TabFilmsNowShowing
