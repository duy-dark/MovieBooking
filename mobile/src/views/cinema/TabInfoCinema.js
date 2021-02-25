import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import styles from '../../styles/views/cinema/tab-infomation'
import Ionicons from 'react-native-vector-icons/Ionicons'

const TabInfoCinema = () => {
    const image = { uri: "https://booking.bhdstar.vn/CDN/Image/Entity/CinemaGallery/0000000004?width=1024&height=316" }
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image style={styles.image} source={image}/>
            <Text style={styles.nameCinema}>BHD Star Quang Trung</Text>
            <View style={styles.areaInfo}>
                <View style={styles.row}>
                    <Ionicons name="location-outline" color="gray" size={25} />
                    <Text style={styles.content}>190 Quang Trung, Phường 10, Gò Vấp, HCM</Text>
                </View>
                <View style={styles.row}>
                    <Ionicons name="call-outline" color="gray" size={25} />
                    <Text style={styles.content}>028 3989 2468</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default TabInfoCinema
