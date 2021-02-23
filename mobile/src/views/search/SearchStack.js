import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from "./SearchScreen"

const Stack = createStackNavigator();
const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
            <Stack.Screen 
                name="SearchScreen" 
                component={SearchScreen} 
                options={{ 
                    title: "Mua vé nhanh",
                    headerLeft: null
                }} 
            />
        </Stack.Navigator>
    )
}

export default SearchStack
