import React, { useEffect } from 'react'
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import CardCinema from '../../components/cinema/CardCinema'
import { useSelector, useDispatch } from "react-redux"
import { getListCinemas } from '../../redux/cinemas/action'

const CinemaScreen = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListCinemas())
    }, [])

    const cinemas = useSelector((state) => state.cinemas.cinemasList)
    const indicator = useSelector((state) => state.cinemas.loading)
    
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <SafeAreaView>
            <FlatList  
                data={cinemas}  
                renderItem={({item}) => <CardCinema navigation={props.navigation} item={item} />}
                keyExtractor={item => item._id}
            /> 
        </SafeAreaView>
    )
}

export default CinemaScreen
