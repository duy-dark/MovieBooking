import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './AccountScreen';
import TabInfomation from '../film/TabInfomation'
import QRCodeScreen from './QRCodeScreen';
import EditCategories from './EditCategories';

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
                name="QRCodeScreen" 
                component={QRCodeScreen} 
                options={{ 
                    title: "QR Code"
                }} 
            />
            <Stack.Screen
                name="TabInfomation"
                component={TabInfomation}
                options={({route}) => ({
                    title: route.params.nameFilm
                })}
            />
            <Stack.Screen
                name="EditCategories"
                component={EditCategories}
                options={{ 
                    title: "Chỉnh sửa thể loại yêu thích"
                }} 
            />
        </Stack.Navigator>
    )
}

export default AccountStack
