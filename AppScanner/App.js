import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from './src/views/Scanner';
import ShowTicket from './src/views/ShowTicket';
import { Provider } from 'react-redux'
import store from './src/redux/stores'
import SelectScanner from './src/views/SelectScanner';
import ShowCoupon from './src/views/ShowCoupon';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerStyle: { height: 80 }}}>
        <Stack.Screen 
            name="SelectScanner" 
            component={SelectScanner} 
            options={{ 
                title: "Chọn chế độ quét mã",
                headerLeft: null
            }} 
        />
        <Stack.Screen 
            name="Scanner" 
            component={Scanner} 
            options={{ 
                title: "Scanner"
            }} 
        />
        <Stack.Screen 
            name="ShowTicket" 
            component={ShowTicket} 
            options={{ 
                title: "Kiểm tra xác thực"
            }} 
        />
         <Stack.Screen 
            name="ShowCoupon" 
            component={ShowCoupon} 
            options={{ 
                title: "Kiểm tra xác thực"
            }} 
        />
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
