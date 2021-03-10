import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabFindByFilm from './TabFindByFilm';
import TabFindByDate from './TabFindByDate';
import TabFindByCinema from './TabFindByCinema';
import { useDispatch, useSelector } from "react-redux"
import { getSearch } from '../../redux/films/actions';

const Tab = createMaterialTopTabNavigator();
const SearchScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSearch())
    }, [])

    return (
       <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: "orangered",
            inactiveTintColor: "darkgray",
            labelStyle: { fontSize: 11 },
            indicatorStyle: { backgroundColor: "orangered" },
        }}
        >
            <Tab.Screen name="TabFindByFilm" component={TabFindByFilm} options={{title: "Theo phim"}}/>
            <Tab.Screen name="TabFindByDate" component={TabFindByDate} options={{title: "Theo ngày"}}/>
            <Tab.Screen name="TabFindByCinema" component={TabFindByCinema} options={{title: "Theo rạp"}}/>
        </Tab.Navigator>
    )
}

export default SearchScreen
