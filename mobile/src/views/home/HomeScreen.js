import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabHome from "./TabHome"
import TabFilmsNowShowing from "./TabFilmsNowShowing"
import TabFilmsComingSoon from "./TabFilmsComingSoon"

const Tab = createMaterialTopTabNavigator();

function HomeScreen(props) {
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
