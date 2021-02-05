import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import FilmScreen from '../film/FilmScreen'
import BookTicketScreen from '../book-ticket/BookTicketScreen'

const Stack = createStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ 
                    title: "Khám Phá", 
                    headerStyle: { height: 80 },
                    headerLeft: null
                }} 
            />
            <Stack.Screen
                name="FilmScreen"
                component={FilmScreen}
                options={({route}) => ({ 
                    title: route.params.nameFilm, 
                    headerStyle: {height: 80} 
                })}
            />
            <Stack.Screen 
                name="BookTicketScreen"
                component={BookTicketScreen}
                options={{
                    title: "Chọn chỗ ngồi",
                    headerStyle: {height: 80}
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack
