import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import styles from '../../styles/components/notification/notification'
import { useSelector } from 'react-redux'
import Notification from '../../components/notification/Notification'

const TabNotification = (props) => {
    const films = useSelector(state => state.films.filmsFutureFavorite)
    const indicator = useSelector(state => state.films.loading)
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView contentContainerStyle={{padding: 15}}>
            <Text style={{fontSize: 16, marginBottom: 10}}>Phim sắp chiếu có thể bạn thích</Text>
            {films && films.length > 0 ? films.map((film, index) => 
            <Notification key={index} film={film} navigation={props.navigation}/>
            ) : <View style={styles.view}><Text style={{fontSize: 15}}>Chưa có, thử lần sau quay lại nhá ...</Text></View>
            }
        </ScrollView>
    )
}

export default TabNotification
