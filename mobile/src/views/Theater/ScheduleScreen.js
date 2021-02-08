import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabInfomation from './TabInfomation'
import TabSchedule from './TabSchedule'


const Tab = createMaterialTopTabNavigator();

function ScheduleScreen() {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: "orangered",
        inactiveTintColor: "darkgray",
        labelStyle: { fontSize: 11 },
        indicatorStyle: { backgroundColor: "orangered" },
      }}
    >
      <Tab.Screen name="TabSchedule" component={TabSchedule} options={{title: "Lịch Chiếu"}}/>
      <Tab.Screen name="TabInfomation" component={TabInfomation} options={{title: "Thông Tin"}}/>
    </Tab.Navigator>
  );
}

export default ScheduleScreen
