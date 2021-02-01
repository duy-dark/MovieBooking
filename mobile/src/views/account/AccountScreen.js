import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabAccount from './TabAccount'
import TabTicketBought from './TabTicketBought'
import TabNotification from './TabNotification'

const Tab = createMaterialTopTabNavigator();
const AccountScreen = () => {
    return (
        <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: "orangered",
            inactiveTintColor: "darkgray",
            labelStyle: { fontSize: 11 },
            indicatorStyle: { backgroundColor: "orangered" },
        }}
        >
            <Tab.Screen name="TabAccount" component={TabAccount} options={{title: "Tài khoản"}}/>
            <Tab.Screen name="TabTicketBought" component={TabTicketBought} options={{title: "Vé đã mua"}}/>
            <Tab.Screen name="TabNotification" component={TabNotification} options={{title: "Thông báo"}}/>
        </Tab.Navigator>
    )
}

export default AccountScreen
