import React from 'react'
import { View, Text,ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-nowshowing"
import CardTheater from "../../components/theater/CardTheater"

const TheaterScreen = ()=>{
    return(
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <CardTheater />
    
     </ScrollView>
    )
}
export default TheaterScreen;