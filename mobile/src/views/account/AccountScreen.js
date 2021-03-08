import React, { useCallback } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabAccount from './TabAccount'
import TabTicketBought from './TabTicketBought'
import TabNotification from './TabNotification'
import { useDispatch, useSelector } from 'react-redux'
import { getListFilmFutureFavorite, getTickets } from '../../redux/films/actions'
import { useFocusEffect } from '@react-navigation/native'


const Tab = createMaterialTopTabNavigator();
const AccountScreen = (props) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
          dispatch(getTickets(user._id))
          dispatch(getListFilmFutureFavorite(user._id))
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [])
      );
    return (
        <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: "orangered",
            inactiveTintColor: "darkgray",
            labelStyle: { fontSize: 11 },
            indicatorStyle: { backgroundColor: "orangered" },
        }}
        >
            <Tab.Screen name="TabAccount" options={{title: "Tài khoản"}}>
                {() => <TabAccount navigation={props.navigation} user={user}/>}
            </Tab.Screen>
            <Tab.Screen name="TabTicketBought" component={TabTicketBought} options={{title: "Vé đã mua"}}/>
            <Tab.Screen name="TabNotification" component={TabNotification} options={{title: "Thông báo"}}/>
        </Tab.Navigator>
    )
}

export default AccountScreen
