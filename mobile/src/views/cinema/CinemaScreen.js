import React from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import CardCinema from '../../components/cinema/CardCinema'


const CinemaScreen = (props) => {
    const DATA = [  
        {id: '1', key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'},
        {id: '2', key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'},
        {id: '3', key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'},
        {id: '4', key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'}, 
        {id: '5', key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'}
    ]

    return (
        <SafeAreaView>
            <FlatList  
                data={DATA}  
                renderItem={({item}) => <CardCinema navigation={props.navigation} item={item} />}
                keyExtractor={item => item.id}
            /> 
        </SafeAreaView>
    )
}

export default CinemaScreen
