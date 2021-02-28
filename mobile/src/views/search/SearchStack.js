import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from "./SearchScreen"
import BookTicketScreen from '../book-ticket/BookTicketScreen';

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
            <Stack.Screen name="BookTicketScreen" component={BookTicketScreen}
                options={{
                    title: "Chọn chỗ ngồi"
                }}
            />
        </Stack.Navigator>
    )
}

export default SearchStack
