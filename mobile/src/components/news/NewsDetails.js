import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getNewsDetails } from '../../redux/news/action'

const NewsDetails = (props) => {
    const idNews = props.route.params.idNews
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNewsDetails(idNews))
    }, [])

    const newsDetails = useSelector((state) => state.news.newsDetails)
    const indicator = useSelector((state) => state.news.loading)

    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView>
            <Text style={{fontSize: 25, fontWeight: "bold", padding: 15, textAlign: "center"}}>{newsDetails.title}</Text>
            {newsDetails.content && newsDetails.content.length > 0 && newsDetails.content.map((paragraph, index) => 
                <View key={index} style={{flex: 1, padding: 15}}>
                    {paragraph.image.length > 0 && 
                        <Image source={{uri: paragraph.image}} style={{width: "100%", flex: 1, height: 450, resizeMode: "contain"}} />
                    }
                    <Text style={{marginTop: 10, fontSize: 15}}>{paragraph.text}</Text>
                </View>
            )}
        </ScrollView>
    )
}

export default NewsDetails

const styles = StyleSheet.create({})
