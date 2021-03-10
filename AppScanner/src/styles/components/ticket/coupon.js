import React from 'react'
import { View, Text } from 'react-native'
import Api from '../../../api/api'

const Coupon = (props) => {
    const id_coupon = props.id_coupon
    // console.log("tickett", ticket)
    Api.put(`/api/coupon/trigger/${id_coupon}`)
    return (
        <View>
            <Text style={{fontSize: 17, fontWeight: "bold"}}>Mã hợp lệ</Text>
        </View>
    )
}

export default Coupon
