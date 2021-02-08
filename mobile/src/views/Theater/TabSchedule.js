import React from 'react'
import { ScrollView } from 'react-native'
import styles from "../../styles/views/home/tabfilms-comingsoon"
import CardSchedule from "../../components/theater/CardSchedule"

const TabSchedule = () => {
    return (
        <ScrollView style={styles.view} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
           <CardSchedule/>
        </ScrollView>
    )
}

export default TabSchedule
