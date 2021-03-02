import React from 'react'
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import styles from '../../styles/views/cinema/tab-infomation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from "react-redux"

const TabInfoCinema = (props) => {
    const image = { uri: props.cinema.url_image }

    const indicator = useSelector((state) => state.cinemas.loading)
    
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image style={styles.image} source={image}/>
            <Text style={styles.nameCinema}>{props.cinema.name}</Text>
            <View style={styles.areaInfo}>
                <View style={styles.row}>
                    <Ionicons name="location-outline" color="gray" size={25} />
                    <Text style={styles.content}>{props.cinema.address}</Text>
                </View>
                {/* <View style={styles.row}>
                    <Ionicons name="call-outline" color="gray" size={25} />
                    <Text style={styles.content}>028 3989 2468</Text>
                </View> */}
            </View>
        </ScrollView>
    )
}

export default TabInfoCinema
