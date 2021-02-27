import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-nowshowing"
import CardFilmNowShowing from "../../components/film/CardFilmNowShowing"
import { useSelector, useDispatch } from "react-redux";
import { getListFilmNow } from "../../redux/films/actions"

const TabFilmsNowShowing = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListFilmNow())
    }, [])

    const films = useSelector((state) => state.films.filmsNow);
    
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {films.map((film, index) => 
                <CardFilmNowShowing key={index} film={film} navigation={props.navigation} />
            )}
        </ScrollView>
    )
}

export default TabFilmsNowShowing
