import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const Discount = (props) => {
    // let time_end = moment(props.discount.created_at).add(7, 'days') - moment.now()
    const { discount } = props
    const onPress = () => {
        props.navigation.navigate("QRCodeDiscount", {
            qrCode: discount._id
        })
        // alert("Hello")
    }
    return (
        <TouchableOpacity style={{flexDirection: "row", justifyContent:"space-between", padding: 10,
        borderColor: "green", borderWidth: 1, borderRadius: 10, marginTop: 10}}
        onPress={onPress}>
            <View>
            {discount.type === 1 ? 
            <Text style={{fontSize: 15, color: "green"}}>Mã khuyến mãi bắp</Text>
            : 
            <Text style={{fontSize: 15, color: "green"}}>Mã khuyến mãi nước</Text>
            }
            <Text style={{fontSize: 14, color: "gray"}}>(thời hạn {moment(discount.created_at).format("DD-MM-YYYY")})</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={15} color="green"/>
        </TouchableOpacity>
    )
}

export default Discount
