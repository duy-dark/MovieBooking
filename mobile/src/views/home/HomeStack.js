import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ 
                    title: "Khám Phá", 
                    headerStyle: { height: 80 }
                }} 
            />
        </Stack.Navigator>
    )
}

export default HomeStack
