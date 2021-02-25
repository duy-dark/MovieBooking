import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeStack from '../home/HomeStack';
import CinemaStack from '../cinema/CinemaStack';
import NewsStack from '../news/NewsStack';
import SearchStack from '../search/SearchStack'
import AccountStack from '../account/AccountStack';
// import TheaterStack from '../Theater/TheaterStack';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === "HomeStack") {
                    iconName = focused ? "star" : 'star-outline';
                } else if (route.name === "CinemaStack") {
                    iconName = focused ? "videocam" : "videocam-outline";
                } else if (route.name === "NewsStack") {
                    iconName = focused ? "newspaper" : "newspaper-outline";
                } else if (route.name === "SearchStack") {
                    iconName = focused ? "search" : "search-outline";
                } else if (route.name === "AccountStack") {
                    iconName = focused ? "person" : "person-outline";
                } 
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
            }}
            
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: "Khám phá" }}/>
            <Tab.Screen name="CinemaStack" component={CinemaStack} options={{title:"Rạp"}}/>
            <Tab.Screen name= "NewsStack" component={NewsStack} options={{title: "Tin tức"}}/>
            <Tab.Screen name="SearchStack" component={SearchStack} options={{title: "Tìm kiếm"}} />
            <Tab.Screen name="AccountStack" component={AccountStack} options={{title: "Tài khoản"}}/>
        </Tab.Navigator>
    )
}

export default MainTabs
