import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import FilmScreen from '../film/FilmScreen'
import BookTicketScreen from '../book-ticket/BookTicketScreen'
import TabInfomation from '../film/TabInfomation';
import CommentScreen from '../comment/CommentScreen';
import ReviewFilmScreen from '../comment/ReviewFilmScreen';
import { Button } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} 
                options={{ 
                    title: "Khám Phá", 
                    headerLeft: null
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
                    title: "Viết bình luận",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => alert("Đăng")}>
                            <Text style={{marginRight: 15, fontSize: 16, color: "#3b5998"}}>Đăng</Text>
                        </TouchableOpacity>
                    )
                }}
            
            />
        </Stack.Navigator>
    )
}

export default HomeStack
