import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './AccountScreen';
import TabInfomation from '../film/TabInfomation'

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
            <Stack.Screen
                name="TabInfomation"
                component={TabInfomation}
                options={({route}) => ({
                    title: route.params.nameFilm
                })}
            />
        </Stack.Navigator>
    )
}

export default AccountStack
