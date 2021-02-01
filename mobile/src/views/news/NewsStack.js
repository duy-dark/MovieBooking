import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from './NewsScreen';

const Stack = createStackNavigator();
const NewsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="NewsScreen" 
                component={NewsScreen} 
                options={{ 
                    title: "Tin tức", 
                    headerStyle: { height: 80 }
                }} 
            />
        </Stack.Navigator>
    )
}

export default NewsStack
