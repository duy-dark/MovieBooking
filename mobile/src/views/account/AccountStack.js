import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './AccountScreen';

const Stack = createStackNavigator();
const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="AccountScreen" 
                component={AccountScreen} 
                options={{ 
                    title: "Cá nhân", 
                    headerStyle: { height: 80 }
                }} 
            />
        </Stack.Navigator>
    )
}

export default AccountStack
