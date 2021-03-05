import React, { useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from '../../styles/components/ticket/ticket'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '../../redux/films/actions'

const TabTicketBought = () => {
    // const user = useSelector((state) => state.users.user)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getTickets(user._id))
    // }, [])
    const tickets = useSelector(state => state.films.tickets)
    // alert(tickets.length)
    const indicator = useSelector(state => state.films.loading)
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView contentContainerStyle={{padding: 15}}>
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10, marginLeft: 15}}>
                <Ionicons name="wallet" size={20} color="gray"/>
                <Text style={{marginLeft: 5, fontSize: 16}}>Danh sách vé đã đặt</Text>
            </View>
            {tickets.length > 0 ? tickets.map((ticket, index) => 
            <View style={styles.container} key={index}>
                <Text >Mã vé: <Text style={styles.code}>9ZGPRL5TU</Text></Text>
                <Text>Tên phim: <Text style={styles.bold}>Cậu Vàng</Text></Text>
                <Text>Rạp: <Text style={styles.bold}>BHD Star Vincom Quang Trung</Text></Text>
                <Text>Số ghế: <Text style={styles.bold}>A06, B05</Text></Text>
                <Text>Phòng: <Text style={styles.bold}>Rạp 5</Text></Text>
                <Text>Thời gian: <Text style={styles.time}> 03/03/2021, 05:00</Text> </Text>
                <Text>Địa chỉ: <Text style={styles.bold}>B1-Vincom QT, 190 Quang Trung, Gò Vấp</Text></Text>
            </View>
            )
                : <View style={styles.view}><Text style={{fontSize: 15}}>Bạn chưa đặt vé...</Text></View>
            }
        </ScrollView>
    )
}

export default TabTicketBought
