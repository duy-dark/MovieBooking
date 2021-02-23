import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabFindByFilm from './TabFindByFilm';
import TabFindByDate from './TabFindByDate';
import TabFindByCinema from './TabFindByCinema';

const Tab = createMaterialTopTabNavigator();
const SearchScreen = () => {
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
