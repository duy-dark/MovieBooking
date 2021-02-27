import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../../styles/components/seat/seat'

const Seat = () => {
    return (
        <TouchableOpacity style={styles.seat}> 
            <Text style={styles.seatImage}></Text>
        </TouchableOpacity>
    )
}

export default Seat
