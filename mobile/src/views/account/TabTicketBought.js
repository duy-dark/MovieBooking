import React from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from '../../styles/components/ticket/ticket'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import Ticket from '../../components/ticket/Ticket'

const TabTicketBought = (props) => {

    const tickets = useSelector(state => state.films.tickets)
    const indicator = useSelector(state => state.films.loading)

    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView contentContainerStyle={{padding: 15}}>
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10, marginLeft: 15}}>
                <Ionicons name="wallet" size={20} color="gray"/>
                <Text style={{marginLeft: 5, fontSize: 16}}>Danh sách vé đã đặt</Text>
            </View>
            {tickets.length > 0 ? tickets.map((ticket, index) => <Ticket key={index} ticket={ticket} navigation={props.navigation} />)
                : <View style={styles.view}><Text style={{fontSize: 15}}>Bạn chưa đặt vé...</Text></View>
            }
        </ScrollView>
    )
}

export default TabTicketBought
