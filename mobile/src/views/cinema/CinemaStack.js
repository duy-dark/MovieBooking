import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CinemaScreen from './CinemaScreen';

const Stack = createStackNavigator();
const CinemaStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="CinemaScreen" 
                component={CinemaScreen} 
                options={{ 
                    title: "Rạp chiếu", 
                    headerStyle: { height: 80 },
                    headerLeft: null
                }} 
            />
        </Stack.Navigator>
    )
}

export default CinemaStack
