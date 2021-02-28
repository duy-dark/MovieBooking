import React, { useEffect } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import CardCinema from '../../components/cinema/CardCinema'
import { useSelector, useDispatch } from "react-redux";
import { getListCinemas } from '../../redux/cinemas/action';


const CinemaScreen = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListCinemas())
    }, [])

    const cinemas = useSelector((state) => state.cinemas.cinemasList);
    return (
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
