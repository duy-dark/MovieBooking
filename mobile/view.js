import * as Google from 'expo-google-app-auth';
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: `420984700024-afpl8o9ukq002kcqilhmfjp56314q5rf.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
        console.log(result)
      return result.accessToken;
    } else {
        console.log('cancel')
      return { cancelled: true };
    }
  } catch (e) {
    console.log("error")

    return { error: true };
  }
}

const V = () => {
    const onPress = () => signInWithGoogleAsync()
    return (
        <TouchableOpacity onPress={onPress} style={{margin: 100}}><Text>Toggle Auth</Text></TouchableOpacity>
    )
}

export default V