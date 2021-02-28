import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../../styles/components/seat/seat'

const Seat = (props) => {
  
    const array1 = [styles.seat], array2= [styles.seatImage]
    const [status, setStatus] = useState();
    if (props.type === "2-1") {
        array1.push(styles.seatTogether)
        array1.push(styles.seatTogether1)
        array2.push(styles.seatTogetherImage)
    }
    if (props.type === "2-2") {
        array1.push(styles.seatTogether)
        array1.push(styles.seatTogether2)
        array2.push(styles.seatTogetherImage)
    }
    if (props.isVip === "1") {
        array1.push(styles.seatVip)
        array2.push(styles.seatVipImage)
    } 
    if (props.isBuy === "1") {
        array1.push(styles.seatBuy)
        array2.push(styles.seatBuyImage)
    } 
    if (props.type === "0") {
        array1.push(styles.seatHidden)
        array2.push(styles.seatHiddenImage)
    }
    if (props.seats.includes(props.value)) {
        array1.push(styles.seatSelected)
        array2.push(styles.seatSelectedImage)
    }
    if (props.arrSeatsSelected.includes(props.value)) {
        array1.push(styles.seatBuyed)
        array2.push(styles.seatBuyedImage)
    }

    const onPressSeat = (seat) => {
        if(!props.arrSeatsSelected.includes(props.value)) {
            if (props.seats.length < 10 ) {
                !status ? setStatus(seat) : setStatus("");
                props.selected(seat);
              } else if (props.seats.includes(seat)) {
                !status ? setStatus(seat) : setStatus("");
                props.selected(seat);
              } 
              else {
                alert("không được mua quá 10 vé");
              }
        }
    }
    
    return (
        <>
        {props.isBuy === "1" ? (
            <TouchableOpacity style={array1} onPress={() => alert("Ghế chỉ được mua ở rạp")}> 
                <View style={array2}>
                    <Text style={{color: "white"}}>X</Text>
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={array1} onPress={() => onPressSeat(props.value)}> 
                <Text style={array2}></Text>
            </TouchableOpacity>
        )}
        
        </>
    )
}

export default Seat
