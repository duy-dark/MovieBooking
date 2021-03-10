import React, { useCallback } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabHome from "./TabHome"
import TabFilmsNowShowing from "./TabFilmsNowShowing"
import TabFilmsComingSoon from "./TabFilmsComingSoon"
import { useDispatch, useSelector } from "react-redux";
import { getListFilmFuture, getListFilmNow, getListFilmNowFavorite } from "../../redux/films/actions"
import { getListNews } from '../../redux/news/action'
import { useFocusEffect } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator();

function HomeScreen(props) {
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  useFocusEffect(
      useCallback(() => {
          dispatch(getListFilmNowFavorite(user._id))
          dispatch(getListNews())
          dispatch(getListFilmNow())
          dispatch(getListFilmFuture())
          return () => {
              // Do something when the screen is unfocused
              // Useful for cleanup functions
            }
      }, [])
  )

  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: "orangered",
        inactiveTintColor: "darkgray",
        labelStyle: { fontSize: 11 },
        indicatorStyle: { backgroundColor: "orangered" },
      }}
    >
      <Tab.Screen name="TabHome" options={{ title: "Home" }}>
        {() => <TabHome navigation={props.navigation} />}
      </Tab.Screen>
      <Tab.Screen name="TabFilmsNowShowing" options={{title: "Đang chiếu"}}>
        {() => <TabFilmsNowShowing navigation={props.navigation} />}
      </Tab.Screen>
      <Tab.Screen name="TabFilmsComingSoon" options={{title: "Sắp chiếu"}}>
        {() => <TabFilmsComingSoon navigation={props.navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default HomeScreen
