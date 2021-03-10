import React, { useEffect, useCallback } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabSchedules from './TabSchedules';
import TabComments from './TabComments';
import TabInfomation from './TabInfomation';
import { useSelector, useDispatch } from "react-redux";
import { getComments, getFilmDetails } from '../../redux/films/actions';
import { useFocusEffect } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator();
const FilmScreen = (props) => {
    const idFilm = props.route.params.idFilm

    const dispatch = useDispatch()
    useFocusEffect(
      useCallback(() => {
        // Do something when the screen is focused
        const info = { 
          id: idFilm
        }
        dispatch(getFilmDetails(info))
        dispatch(getComments(idFilm))
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        }
      }, [])
    )
    // useEffect(() => {
    //   const info = { 
    //     id: idFilm
    //   }
    //   dispatch(getFilmDetails(info))
    //   dispatch(getComments(idFilm))
    // }, [])

    const film = useSelector((state) => state.films.filmDetail)
    const dayOfWeeks = useSelector((state) => state.films.dayOfWeeks)
    // const listComment = useSelector((state) => state.films.comments)
    return (
      <Tab.Navigator 
        tabBarOptions={{
          activeTintColor: "orangered",
          inactiveTintColor: "darkgray",
          labelStyle: { fontSize: 11 },
          indicatorStyle: { backgroundColor: "orangered" },
        }}
      >
        <Tab.Screen name="TabSchedules" options={{title: "Lịch chiếu"}}>
          {() => <TabSchedules film={film} dayOfWeeks={dayOfWeeks} navigation={props.navigation} />}
        </Tab.Screen>
        <Tab.Screen name="TabComments" options={{title: "Bình luận"}}>
          {() => <TabComments filmId={film._id} navigation={props.navigation} />}
        </Tab.Screen>
        <Tab.Screen name="TabInfomation" options={{title: "Thông tin"}}>
          {() => <TabInfomation film={film} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
}

export default FilmScreen
