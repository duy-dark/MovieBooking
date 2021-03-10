import React from 'react'
import {Text, TouchableOpacity } from 'react-native'
import styles from '../../styles/components/ticket/ticket'
import moment from 'moment'

const Ticket = (props) => {

    const ticket = props.ticket
    const clickTicket = () => {
        if(ticket.ticket_status === 1 || ticket.ticket_status === 2) {
            props.navigation.navigate("QRCodeScreen", {
                id_ticket: ticket._id
            })
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={clickTicket}>
        <Text >Mã vé: <Text style={styles.code}>{ticket.code}</Text></Text>
        <Text>Tên phim: <Text style={styles.bold}>{ticket.film_schedules.films.name}</Text></Text>
        <Text>Rạp: <Text style={styles.bold}>{ticket.film_schedules.theaters.name}</Text></Text>
        <Text>Số ghế: {ticket.seats.map((seat, index) => 
            <Text key={index} style={styles.bold}>{seat} </Text>)}
        </Text>
        <Text>Phòng: <Text style={styles.bold}>{ticket.film_schedules.rooms.name}</Text></Text>
        <Text>Thời gian: <Text style={styles.time}>{moment(ticket.film_schedules.time_start).format('DD/MM/YYYY LT')}</Text> </Text>
        <Text>Địa chỉ: <Text style={styles.bold}>{ticket.film_schedules.theaters.address}</Text></Text>
        {ticket.ticket_status ? <Text style={{color: "green"}}>Đã thanh toán</Text> : <Text style={{color: "red"}}>Chưa thanh toán</Text>}
    </TouchableOpacity>
    )
}

export default Ticket
