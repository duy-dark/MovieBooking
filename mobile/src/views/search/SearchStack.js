import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from "./SearchScreen"
import BookTicketScreen from '../book-ticket/BookTicketScreen';
import Screen from '../screen/Screen';


const Stack = createStackNavigator();
const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
            <Stack.Screen 
                name="SearchScreen" 
                component={SearchScreen} 
                options={{ 
                    title: "Mua vé nhanh",
                    headerLeft: null
                }} 
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

export default SearchStack
