import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCouponDetail } from '../redux/films/action'
import Coupon from '../styles/components/ticket/coupon'

const ShowCoupon = (props) => {
    const id_coupon = props.route.params.id_coupon
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCouponDetail(id_coupon))
    }, [])
    const coupon = useSelector(state => state.films.couponDetail)
    const indicator = useSelector(state => state.films.loading)
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {coupon && Object.keys(coupon).length === 0 && coupon.constructor === Object ? 
               <Text style={{fontSize: 17, fontWeight: "bold"}}>Mã khuyến mãi không tồn tại</Text>
                : (coupon.coupons_status === 2 ?
                <Text style={{fontSize: 17, fontWeight: "bold"}}>Mã đã sử dụng</Text>
                : <Coupon id_coupon={id_coupon} />
                )
            }
        </View>
    )
}

export default ShowCoupon
