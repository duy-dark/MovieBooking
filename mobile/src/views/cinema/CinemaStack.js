import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CinemaScreen from './CinemaScreen';
import CinemaDetailScreen from './CinemaDetailScreen';
import BookTicketScreen from '../book-ticket/BookTicketScreen';
import Screen from '../screen/Screen';


const Stack = createStackNavigator();
const CinemaStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { height: 80 }}}>
            <Stack.Screen 
                name="CinemaScreen" 
                component={CinemaScreen} 
                options={{ 
                    title: "Rạp chiếu",
                    headerLeft: null
                }} 
            />
            <Stack.Screen 
                name="CinemaDetailScreen" 
                component={CinemaDetailScreen} 
                options={({route}) => ({
                    title: route.params.nameCinema
                })}
            />
            <Stack.Screen name="BookTicketScreen" component={BookTicketScreen}
                options={{
                    title: "Chọn chỗ ngồi"
                }}
            />
            <Stack.Screen name="Screen" component={Screen}
                options={({navigation}) =>
                    ({
                        title: "Tình trạng đặt vé",
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

export default CinemaStack
