import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabNews from './TabNews';
import TabPromotions from './TabPromotions';


const Tab = createMaterialTopTabNavigator();
const NewsScreen = () => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: "orangered",
            inactiveTintColor: "darkgray",
            labelStyle: { fontSize: 11 },
            indicatorStyle: { backgroundColor: "orangered" },
        }}
        >
            <Tab.Screen name="TabReview" component={TabNews} options={{title: "News"}}/>
            <Tab.Screen name="TabPromotions" component={TabPromotions} options={{title: "Khuyến mãi"}}/>
        </Tab.Navigator>
    )
}

export default NewsScreen
