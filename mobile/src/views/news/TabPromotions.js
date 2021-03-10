import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import styles from '../../styles/views/news/tabnews'
import CardNews from '../../components/news/CardNews'

const TabPromotions = (props) => {
    return (
       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
           {/* <Text style={styles.section}>Đừng bỏ lỡ...</Text>
           <CardNews navigation={props.navigation} />
           <View style={styles.area}>
               <Text style={styles.section}>Nhiều ưu đãi khác đang đợi bạn</Text>
           </View> */}
       </ScrollView>
    )
}

export default TabPromotions
