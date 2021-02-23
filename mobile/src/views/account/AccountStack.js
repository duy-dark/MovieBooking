import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './AccountScreen';

const Stack = createStackNavigator();
const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
            <Stack.Screen 
                name="AccountScreen" 
                component={AccountScreen} 
                options={{ 
                    title: "Cá nhân",
                    headerLeft: null
                }} 
            />
        </Stack.Navigator>
    )
}

export default AccountStack
