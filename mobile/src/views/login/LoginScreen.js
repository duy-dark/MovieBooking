import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from '../../styles/views/login/login-screen'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { useDispatch } from "react-redux";
import { signIn } from '../../redux/users/actions';

 
const signInWithGoogleAsync = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: `420984700024-afpl8o9ukq002kcqilhmfjp56314q5rf.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
}
const signInWithFacebook = async() => {
  try {
    await Facebook.initializeAsync({
      appId: '482525533157759',
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      // console.log(token)
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      return response.json()
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}


const LoginScreen = (props) => {
    const imageBackground = { uri: "https://tix.vn/app/assets/img/icons/backapp.jpg" }
    const logo = { uri: "https://tix.vn/app/assets/img/login/group@2x.png" }
    const iconGoogle = { uri: "https://ai.devoteam.com/wp-content/uploads/sites/91/2018/05/google-logo-icon-png-transparent-background.png"}
    const avatarDefaul = { uri: "https://1.bp.blogspot.com/-A7UYXuVWb_Q/XncdHaYbcOI/AAAAAAAAZhM/hYOevjRkrJEZhcXPnfP42nL3ZMu4PvIhgCLcBGAsYHQ/s1600/Trend-Avatar-Facebook%2B%25281%2529.jpg"}
    const [indicator, setIndicator] = useState(false)

    const dispatch = useDispatch()

    const loginFaceBook = async() => {
      const response = await signInWithFacebook()
      if(response.id) {
        const user = {
          facebook_id: response.id,
          name: response.name,
          avatar: avatarDefaul,
          account_type: "facebook",
        }
        dispatch(signIn(user, props.navigation));
      }
      setIndicator(true)
    }

    const loginGoogle = async() => {  
        const response = await signInWithGoogleAsync()
        if(response.user) {
            const user = {
              google_id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              avatar: response.user.photoUrl,
              account_type: "google",
            };
            dispatch(signIn(user, props.navigation));
        }
        setIndicator(true)
    };
    
    return (
        <View style={styles.container}>
          {indicator ? <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> : 
            <ImageBackground style={styles.imageBackground} source={imageBackground}>
                <Image style={styles.logo} source={logo} />
                <TouchableOpacity style={styles.buttonFacebook} onPress={loginFaceBook}
                >
                    <Icon name="facebook-f" size={20} color="white" />
                    <Text style={styles.textFacebook}>Login with Facebook</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle} onPress={loginGoogle}>
                    <Image style={styles.iconGoogle} source={iconGoogle} />
                    <Text style={styles.textGoogle}>Login with Gmail</Text> 
                </TouchableOpacity>
            </ImageBackground>
          }
        </View>
    )
}

export default LoginScreen
