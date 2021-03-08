import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import FilmScreen from '../film/FilmScreen'
import BookTicketScreen from '../book-ticket/BookTicketScreen'
import TabInfomation from '../film/TabInfomation';
import CommentScreen from '../comment/CommentScreen';
import ReviewFilmScreen from '../comment/ReviewFilmScreen';
import NewsDetails from '../../components/news/NewsDetails';
import Screen from '../screen/Screen';
import { TouchableOpacity, Text } from 'react-native'

const Stack = createStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} 
                options={{ 
                    title: "Khám Phá", 
                    headerLeft: null,
                    
                }} 
            />
            <Stack.Screen name="FilmScreen" component={FilmScreen}
                options={({route}) => ({ 
                    title: route.params.nameFilm
                })}
            />
            <Stack.Screen name="BookTicketScreen" component={BookTicketScreen}
                options={{
                    title: "Chọn chỗ ngồi"
                }}
            />
            <Stack.Screen name="TabInfomation" component={TabInfomation}
                options={({route}) => ({
                    title: route.params.nameFilm
                })}
            />
            <Stack.Screen name="CommentScreen" component={CommentScreen}
                options={{
                    title: "Bình luận",
                }}
            />
            <Stack.Screen name="ReviewFilmScreen" component={ReviewFilmScreen}
                options={{
                    title: "Viết bình luận"
                }}
            />
            <Stack.Screen 
                name="NewsDetails" 
                component={NewsDetails} 
                options={{ 
                    title: "Nội dung tin tức"
                }} 
            />
            <Stack.Screen name="Screen" component={Screen}
                options={({navigation}) =>
                    ({
                        title: "Tình trạng đặt vé",
                        headerLeft: null,
                        headerRight: () => <TouchableOpacity style={{marginRight: 20}}
                            onPress={() => navigation.navigate("AccountStack")}>
                            <Text style={{fontSize: 17, color: "#3b5998"}}>Xem vé</Text>
                        </TouchableOpacity>
                    })
                }
            />
        </Stack.Navigator>
    )
}

export default HomeStack
