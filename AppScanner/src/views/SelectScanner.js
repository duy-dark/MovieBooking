import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SelectScanner = (props) => {
    const ScanTicket = () => {
        props.navigation.navigate("Scanner", {
            type: 1
        })
    }
    const ScanCoupon = () => {
        props.navigation.navigate("Scanner", {
            type: 2
        })
    }
    return (
        <View style={{flex: 1,justifyContent:"center", alignItems: "center"}}>
            <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, borderColor: "orangered", padding: 15, width: 200}} onPress={ScanTicket}>
                <Text style={{fontSize: 17, color: "orangered", textAlign:"center"}}>
                    Quét mã vé
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, borderColor: "orangered", padding: 15, width: 200, marginTop: 15}} onPress={ScanCoupon}>
                <Text style={{fontSize: 17, color: "orangered", textAlign:"center"}}>
                    Quét mã khuyến mãi
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectScanner
