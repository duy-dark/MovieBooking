import React, { useEffect } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import styles from "../../styles/views/home/tabfilms-comingsoon"
import CardFilmComingSoon from "../../components/film/CardFilmComingSoon"
import { useSelector, useDispatch } from "react-redux";
import { getListFilmFuture } from "../../redux/films/actions"

const TabFilmsComingSoon = (props) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getListFilmFuture())
    // }, [])

    const films = useSelector((state) => state.films.filmsFuture);
    const indicator = useSelector((state) => state.films.loading);

    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView style={styles.view} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {films.map((film, index) => 
                <CardFilmComingSoon key={index} film={film} navigation={props.navigation} />
            )}
        </ScrollView>
    )
}

export default TabFilmsComingSoon
