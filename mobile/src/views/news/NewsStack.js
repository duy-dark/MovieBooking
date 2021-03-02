import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from './NewsScreen';
import NewsDetails from '../../components/news/NewsDetails';

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
            <Stack.Screen 
                name="NewsDetails" 
                component={NewsDetails} 
                options={{ 
                    title: "Nội dung tin tức"
                }} 
            />
        </Stack.Navigator>
    )
}

export default NewsStack
