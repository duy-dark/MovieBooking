import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from '../../styles/views/news/tabnews'
import CardNews from '../../components/news/CardNews'
import CardNewsSummary from '../../components/news/CardNewsSummary'

const TabNews = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.section}>Tin được quan tâm nhất</Text>
            <CardNews />
            <CardNews />
            <View style={styles.area}>
                <Text style={styles.section}>Hóng thêm tin mới</Text>
                <CardNewsSummary />
                <CardNewsSummary />
                <CardNewsSummary />
                <CardNewsSummary />
                <CardNewsSummary />
            </View>
        </ScrollView>
    )
}

export default TabNews
