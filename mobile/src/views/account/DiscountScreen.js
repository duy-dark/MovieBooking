import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Discount from '../../components/discount/Discount'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getUserInfo } from '../../redux/users/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import Api from '../../api/api'

const DiscountScreen = (props) => {
    const user = useSelector(state => state.users.user)
    const [showDialog, setShowDialog] = useState(false)
    const [type, setType] = useState(null)
    const [discount, setDiscount] = useState([])
    const [point, setPoint] = useState(user.point)

    useEffect(() => {
        async function getData() {
            var data = await Api.get(`api/coupon/customer_id/${user._id}`).then(res => res.data.data)
            setPoint(data.point)
            setDiscount(data.coupons)
        }
        getData()
    }, [])
 
    const Promotion = async() => {
        const params = {
            customer_id: user._id,
            type: type,
            point: point
        }
        await Api.post("/api/coupon", params).then((res) =>res.data.data)
        setShowDialog(false)
        props.navigation.replace("DiscountScreen")
    }
    const popoCorn = () => {
        setType(1)
        if(point < 5) {
            alert("Không đủ điểm đổi bắp")
        }
        else {
            setShowDialog(true)
        }
    }
    const water = () => {
        setType(2)
        if(point < 5) {
            alert("Không đủ điểm đổi nước")
        }
        else {
            setShowDialog(true)
        }
    }
    return (
        <ScrollView>
            <View>
                <Dialog.Container visible={showDialog}>
                    <Dialog.Description>
                       Xác nhận đổi mã
                    </Dialog.Description>
                    <Dialog.Button onPress={() => setShowDialog(false)} label="Cancel" />
                    <Dialog.Button onPress={Promotion} label="OK"/>
                </Dialog.Container>
            </View>
            <View style={{margin: 10, padding: 15, backgroundColor: "white"}}>
                <Text style={{fontSize: 15}}>Điểm tích lũy hiện có : <Text style={{color: "green", fontSize: 17, fontWeight: "bold"}}>{point} điểm</Text></Text>
            </View>
            <View style={{margin: 10, padding: 15, backgroundColor: "white"}}>
                <Text style={{fontSize: 15}}>Đổi khuyến mãi</Text>
                <TouchableOpacity style={{flexDirection: "row", justifyContent:"space-between", padding: 20,
                borderColor: "orangered", borderWidth: 1, borderRadius: 10, marginTop: 10, alignItems: "center", backgroundColor: "white"}}
                    onPress={popoCorn}
                >
                    <Image style={{height: 50, width: 50, borderRadius: 50}} source={{uri: "https://www.pikpng.com/pngl/m/215-2155762_popcorn-icon-popcorn-flat-vector-png-clipart.png"}}/>
                    <Text style={{fontSize: 18, color: "orangered"}}>Đổi bắp (5 điểm)</Text>
                    <Ionicons name="add-circle-outline" size={25} color="orangered"/>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", justifyContent:"space-between", padding: 20,
                borderColor: "orangered", borderWidth: 1, borderRadius: 10, marginTop: 10, alignItems: "center", backgroundColor: "white"}}
                    onPress={water}
                >
                    <Image style={{height: 50, width: 50}} source={{uri: "https://cdn1.iconfinder.com/data/icons/cinema-81/64/16-softdrink-512.png"}}/>
                    <Text style={{fontSize: 18, color: "orangered"}}>Đổi nước (5 điểm)</Text>
                    <Ionicons name="add-circle-outline" size={25} color="orangered"/>
                </TouchableOpacity>
            </View>
            <View style={{margin: 10, padding: 15, backgroundColor: "white"}}>
                <Text style={{fontSize: 15}}>Danh sách khuyến mãi hiện có</Text>
                {discount.length > 0 ? discount.map((item, index) => 
                    <Discount key={index} discount={item} navigation={props.navigation}/>
                )
                : <View style={{marginTop: 15}}><Text style={{fontSize: 17}}>Bạn chưa đổi khuyến mãi...</Text></View>
                }
            </View>
        </ScrollView>
    )
}

export default DiscountScreen
