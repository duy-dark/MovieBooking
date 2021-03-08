import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ActivityIndicator, Touchable } from 'react-native'
import { getTicketDetail } from '../../redux/films/actions'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Screen = (props) => {
    const url = props.route.params.url

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTicketDetail(url))
    }, [])
    const ticketDetail = useSelector(state => state.films.ticketDetail)
    const indicator = useSelector(state => state.films.loading)
    const onReload = () => {
        props.navigation.replace("Screen", {
            url: url
        })
    }
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 150}} size="large" color="orangered" /> 
    else return (
        <View style={{flex: 1, marginTop: 200, alignItems: "center"}}>
            {ticketDetail.ticket_status ?
                <Text style={{fontSize: 20, color: "green"}}>Đã thanh toán thành công</Text>
                 : 
                <Text style={{fontSize: 20, color: "red"}}>Chưa thanh toán</Text>
            } 
            <TouchableOpacity style={{padding: 10, backgroundColor: "white", marginTop: 5, borderColor: "gray", borderWidth: 0.5, borderRadius: 5}} onPress={onReload}>
                <Text style={{fontSize: 15, color: "gray"}}>Reload</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{padding: 15}}
                onPress={() => navigation.navigate("AccountStack", {
                    screen: "TabTicketBought"
                })}>
                <Text style={{fontSize: 17, color: "#3b5998"}}>Xem vé</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Screen
