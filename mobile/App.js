import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/views/login/LoginScreen'
import MainTabs from './src/views/main/MainTabs'
import { Provider } from 'react-redux'
import store from './src/redux/stores'
import 'localstorage-polyfill';
import SelectCategories from './src/views/categories/SelectCategories'
import Screen from './src/views/screen/Screen'
// import Test from './Test'

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="SelectCategories" component={SelectCategories}
            options={{headerLeft: false}}/>
            <Stack.Screen name="MainTabs" component={MainTabs} 
            options={{headerLeft: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
      {/* <SelectCategories /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
