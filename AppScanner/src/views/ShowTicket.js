import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ticket from '../components/ticket/Ticket'
import { getTicketDetail } from '../redux/films/action'

const ShowTicket = (props) => {
    const id_ticket = props.route.params.id_ticket
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTicketDetail(id_ticket))
    }, [])
    const ticket = useSelector(state => state.films.ticketDetail)
    const indicator = useSelector(state => state.films.loading)
    // console.log(ticket, "ticket")
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {ticket && Object.keys(ticket).length === 0 && ticket.constructor === Object ? 
               <Text style={{fontSize: 17, fontWeight: "bold"}}>Vé không tồn tại</Text>
                : (ticket.ticket_status === 2 ?
                <Text style={{fontSize: 17, fontWeight: "bold"}}>Vé đã sử dụng</Text>
                : <Ticket ticket={ticket} />)
            }
        </View>
    )
}

export default ShowTicket
