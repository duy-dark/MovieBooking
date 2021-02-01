import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabSchedules from './TabSchedules';
import TabComments from './TabComments';
import TabInfomation from './TabInfomation';

const Tab = createMaterialTopTabNavigator();
const FilmScreen = () => {
    return (
        <Tab.Navigator 
          tabBarOptions={{
            activeTintColor: "orangered",
            inactiveTintColor: "darkgray",
            labelStyle: { fontSize: 11 },
            indicatorStyle: { backgroundColor: "orangered" },
          }}
        >
          <Tab.Screen name="TabSchedules" component={TabSchedules} options={{title: "Lịch chiếu"}}/>
          <Tab.Screen name="TabComments" component={TabComments} options={{title: "Bình luận"}}/>
          <Tab.Screen name="TabInfomation" component={TabInfomation} options={{title: "Thông tin"}}/>
        </Tab.Navigator>
      );
}

export default FilmScreen
