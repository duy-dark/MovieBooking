import React, { useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from '../../styles/views/news/tabnews'
import CardNews from '../../components/news/CardNews'
import CardNewsSummary from '../../components/news/CardNewsSummary'
import { useSelector, useDispatch } from "react-redux";
import { getListNews } from '../../redux/news/action'

const TabNews = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListNews())
    }, [])

    var news = useSelector((state) => state.news.newsList)
    news = news.map(item => {
        let arr = item.content.filter(val => val.image)
        return {
          ...item,
          image: arr[0].image,
          subtitle: item.content[0].text
        }
    })
    const newsTab = news.slice(0,3)
    const newsSummary = news.slice(3,news.length)
    const indicator = useSelector((state) => state.news.loading)

    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.section}>Tin được quan tâm nhất</Text>
            {newsTab.map((news, index) => 
                <CardNews key={index} news={news} navigation={props.navigation}/>
            )}
            <View style={styles.area}>
                <Text style={styles.section}>Hóng thêm tin mới</Text>
                {newsSummary.map((news, index) => 
                    <CardNewsSummary key={index} news={news} navigation={props.navigation}/>
                )}
            </View>
        </ScrollView>
    )
}

export default TabNews
