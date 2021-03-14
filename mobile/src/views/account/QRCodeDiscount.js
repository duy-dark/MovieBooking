import React from 'react'
import { View, Text, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

const QRCodeDiscount = (props) => {
    const qrCode = props.route.params.qrCode
   
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            {/* <Text>{id_ticket}</Text> */}
            <Text style={{marginBottom: 15, fontSize: 17}}>Mã khuyến mã</Text>
            <QRCode value={qrCode} size={250}/>
        </View>
    )
}

export default QRCodeDiscount
