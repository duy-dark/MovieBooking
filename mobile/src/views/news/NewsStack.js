import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from './NewsScreen';

const Stack = createStackNavigator();
const NewsStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
            <Stack.Screen 
                name="NewsScreen" 
                component={NewsScreen} 
                options={{ 
                    title: "Tin tức",
                    headerLeft: null
                }} 
            />
        </Stack.Navigator>
    )
}

export default NewsStack
