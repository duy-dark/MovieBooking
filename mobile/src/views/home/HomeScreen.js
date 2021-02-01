import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabHome from "./TabHome"
import TabFilmsNowShowing from "./TabFilmsNowShowing"
import TabFilmsComingSoon from "./TabFilmsComingSoon"

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: "orangered",
        inactiveTintColor: "darkgray",
        labelStyle: { fontSize: 11 },
        indicatorStyle: { backgroundColor: "orangered" },
      }}
    >
      <Tab.Screen name="TabHome" component={TabHome} options={{title: "Home"}}/>
      <Tab.Screen name="TabFilmsNowShowing" component={TabFilmsNowShowing} options={{title: "Đang chiếu"}}/>
      <Tab.Screen name="TabFilmsComingSoon" component={TabFilmsComingSoon} options={{title: "Sắp chiếu"}}/>
    </Tab.Navigator>
  );
}

export default HomeScreen
