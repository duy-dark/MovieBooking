import React from 'react'
import { View, Text, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = (props) => {
    const id_ticket = props.route.params.id_ticket
   
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            {/* <Text>{id_ticket}</Text> */}
            <Text style={{marginBottom: 15, fontSize: 17}}>Mã vé</Text>
            <QRCode value={id_ticket} size={250}/>
        </View>
    )
}

export default QRCodeScreen
