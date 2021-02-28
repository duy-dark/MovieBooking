import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabSchedules from './TabSchedules';
import TabComments from './TabComments';
import TabInfomation from './TabInfomation';
import { useSelector, useDispatch } from "react-redux";
import { getComments, getFilmDetails } from '../../redux/films/actions';

const Tab = createMaterialTopTabNavigator();
const FilmScreen = (props) => {
    const idFilm = props.route.params.idFilm

    const dispatch = useDispatch()

    useEffect(() => {
      const info = { 
        id: idFilm
      }
      dispatch(getFilmDetails(info))
      dispatch(getComments(idFilm))
    }, [])

    const film = useSelector((state) => state.films.filmDetail);
    const dayOfWeeks = useSelector((state) => state.films.dayOfWeeks);
    const comments = useSelector((state) => state.films.comments)
    
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
          {() => <TabComments comments={comments} imdb={film.imdb} rateCount={film.rate_count} navigation={props.navigation} />}
        </Tab.Screen>
        <Tab.Screen name="TabInfomation" options={{title: "Thông tin"}}>
          {() => <TabInfomation film={film} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
}

export default FilmScreen
