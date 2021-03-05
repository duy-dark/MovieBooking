import React from 'react'
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../styles/components/notification/notification'
import { useDispatch, useSelector } from 'react-redux'
import { getListFilmFutureFavorite } from '../../redux/films/actions'

const TabNotification = (props) => {
    // const user = useSelector((state) => state.users.user)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getListFilmFutureFavorite(user._id))
    // }, [])
    const films = useSelector(state => state.films.filmsFutureFavorie)
    const indicator = useSelector(state => state.films.loading)
    const onPress = () => {
        // props.navigation.navigate("TabInfomation", {
        //     nameFilm: props.film.name,
        //     film: props.film
        // })
    }
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ScrollView contentContainerStyle={{padding: 15}}>
            <Text style={{fontSize: 16, marginBottom: 10}}>Phim sắp chiếu có thể bạn thích</Text>
            {films.length > 0 ? films.map((film, index) => 
            <TouchableOpacity key={index} style={styles.container} onPress={onPress}>
                <Image style={styles.image} source={{uri: "https://lh3.googleusercontent.com/proxy/f9eD3jn6X3Nn85162THf9cdiTzYh0LQdMT7d_fEnganA9hjwxca6zqCl9OvlHxdPkF0CuC038C9lbugpsNVxN8F_th-5ww"}}/>
                <Text style={{marginLeft: 10, flex: 1}}><Text style={styles.bold}>Cậu vàng</Text> sắp chiếu vào ngày <Text style={styles.bold}>15/03</Text></Text>
                <Ionicons name="notifications" size={20} color="orangered"/>
            </TouchableOpacity>
             ) : <View style={styles.view}><Text style={{fontSize: 15}}>Chưa có, thử lần sau quay lại nhá ...</Text></View>
            }
        </ScrollView>
    )
}

export default TabNotification
