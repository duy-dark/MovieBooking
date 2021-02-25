import React from 'react'
import { View, Text } from 'react-native'
import TheaterScreen from './TheaterScreen';
import ScheduleScreen from './ScheduleScreen'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const TheaterStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen 
            name="TheaterScreen" 
            component={TheaterScreen} 
            options={{ 
                title: "Rạp Chiếu", 
                headerStyle: { height: 80 },
                cardStyle:{ backgroundColor: 'red' }
            }} 
            
        />
        <Stack.Screen
           name="ScheduleScreen" 
            component={ScheduleScreen} 
            options={{ 
                title: "Star Moive", 
                headerStyle: { height: 80 },
                cardStyle:{ backgroundColor: 'red' }
            }} 
        />
    </Stack.Navigator>
    )
}

export default TheaterStack