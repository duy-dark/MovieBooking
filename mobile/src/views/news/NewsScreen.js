import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabNews from './TabNews';
import TabPromotions from './TabPromotions';


const Tab = createMaterialTopTabNavigator();
const NewsScreen = (props) => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: "orangered",
            inactiveTintColor: "darkgray",
            labelStyle: { fontSize: 11 },
            indicatorStyle: { backgroundColor: "orangered" },
        }}
        >
            <Tab.Screen name="TabReview" options={{title: "News"}}>
                {() => <TabNews navigation={props.navigation} />}
            </Tab.Screen>
            <Tab.Screen name="TabPromotions" options={{title: "Khuyến mãi"}}>
                {() => <TabPromotions navigation={props.navigation} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default NewsScreen
