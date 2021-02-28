import React from 'react'
import { View, Text } from 'react-native'
import Seat from "./Seat"

const SeatRow = (props) => {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{fontSize: 20, color: "black", marginRight: 10}}>{props.name}</Text>
            <View style={{flexDirection: "row"}}>
            {props.rows.map((item, index) => (
                <>
                {props.types[index] === "0" ? (
                    <View key={index} style={{height: 21, width: 22.5}}></View>
                ) : (
                    <Seat key={index} value={item} type={props.types[index]} isBuy={props.buys[index]} isVip={props.vips[index]} seats={props.seats} selected={seat => props.selected(seat)} arrSeatsSelected={props.arrSeatsSelected}/>
                )}
                </>
            ))}
            </View>
            
        </View>
    )
}

export default SeatRow
