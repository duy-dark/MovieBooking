import React from 'react'
import {Text, TouchableOpacity } from 'react-native'
import styles from '../../styles/components/ticket/ticket'
import moment from 'moment'
import Api from '../../api/api'

const Ticket = (props) => {

    const ticket = props.ticket
    // console.log("tickett", ticket)
    Api.put(`api/ticket/trigger/${ticket._id}`)
    return (
        <TouchableOpacity style={styles.container}>
        <Text >Mã vé: <Text style={styles.code}>{ticket.code}</Text></Text>
        <Text>Tên phim: <Text style={styles.bold}>{ticket.film_schedules.film}</Text></Text>
        <Text>Rạp: <Text style={styles.bold}>{ticket.film_schedules.theater}</Text></Text>
        <Text>Số ghế: {ticket.seats.map((seat, index) => 
            <Text key={index} style={styles.bold}>{seat} </Text>)}
        </Text>
        <Text>Phòng: <Text style={styles.bold}>{ticket.film_schedules.room}</Text></Text>
        <Text>Thời gian: <Text style={styles.time}>{moment(ticket.film_schedules.time_start).format('DD/MM/YYYY LT')}</Text> </Text>
        <Text>Địa chỉ: <Text style={styles.bold}>{ticket.film_schedules.address}</Text></Text>
        {ticket.ticket_status ? <Text style={{color: "green"}}>Đã thanh toán</Text> : <Text style={{color: "red"}}>Chưa thanh toán</Text>}
    </TouchableOpacity>
    )
}

export default Ticket
