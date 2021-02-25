import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabScheduleCinema from './TabScheduleCinema'
import TabInfoCinema from './TabInfoCinema'


const Tab = createMaterialTopTabNavigator();

const CinemaDetailScreen = () => {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: "orangered",
        inactiveTintColor: "darkgray",
        labelStyle: { fontSize: 11 },
        indicatorStyle: { backgroundColor: "orangered" },
      }}
    >
      <Tab.Screen name="TabScheduleCinema" component={TabScheduleCinema} options={{title: "Lịch Chiếu"}}/>
      <Tab.Screen name="TabInfoCinema" component={TabInfoCinema} options={{title: "Thông Tin"}}/>
    </Tab.Navigator>
  );
}

export default CinemaDetailScreen
