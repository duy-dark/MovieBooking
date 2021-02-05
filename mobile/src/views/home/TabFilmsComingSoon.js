import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-comingsoon"
import CardFilmComingSoon from "../../components/film/CardFilmComingSoon"
import { useSelector, useDispatch } from "react-redux";
import { getListFilmFuture } from "../../redux/films/actions"

const TabFilmsComingSoon = () => {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getListFilmFuture())
    // }, [])

    // const films = useSelector((state) => state.films.filmsFuture);
    // console.log(films)
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
            {/* {films.map(film => {
                <CardFilmComingSoon film={film} />
            })} */}
        </ScrollView>
    )
}

export default TabFilmsComingSoon
