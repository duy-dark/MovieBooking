import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { getTicketDetail } from '../../redux/films/actions'
import { useDispatch, useSelector } from 'react-redux'

// async function getDataUrl() {
// // alert(url)
//     try {
//         const dispatch = useDispatch()
//         const url = await AsyncStorage.getItem("url")
//         if(url) {
//         dispatch(getTicketDetail(url))
//         }
//     } catch(e) {
//         // error reading value
//     }
// }

const Screen = (props) => {
    const url = props.route.params.url
    const [, setReload] = useState()
    const forceUpdate = useCallback(
        () => setReload({}) 
        ,[]
    )
    const dispatch = useDispatch()
    useEffect(() => {
        // alert("Hello")
        dispatch(getTicketDetail(url))
        forceUpdate
    }, [])
    // const message = props.route.params.message
    // alert(message)
    const ticketDetail = useSelector(state => state.films.ticketDetail)
    const indicator = useSelector(state => state.films.loading)
    // alert(ticketDetail.is_paid)
    console.log("ticketDetail",ticketDetail)
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <View style={{flex: 1, marginTop: 100, marginLeft: 100}}>
            {ticketDetail.is_paid ?
                <Text>Đã thanh toán thành công</Text>
                :
                <Text>Chưa thanh toán</Text>
            }
        </View>
    )
}

export default Screen
