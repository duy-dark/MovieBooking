import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import styles from '../../styles/views/login/login-screen'
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = (props) => {
    const imageBackground = { uri: "https://tix.vn/app/assets/img/icons/backapp.jpg" }
    const logo = { uri: "https://tix.vn/app/assets/img/login/group@2x.png" }
    const iconGoogle = { uri: "https://ai.devoteam.com/wp-content/uploads/sites/91/2018/05/google-logo-icon-png-transparent-background.png"}
    const loginGoogle = () => {
        props.navigation.navigate("MainTabs")
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.imageBackground} source={imageBackground}>
                <Image style={styles.logo} source={logo} />
                <TouchableOpacity style={styles.buttonFacebook}
                    onPress={loginGoogle}
                >
                    <Icon name="facebook-f" size={20} color="white" />
                    <Text style={styles.textFacebook}>Login with Facebook</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle}>
                    <Image style={styles.iconGoogle} source={iconGoogle} />
                    <Text style={styles.textGoogle}>Login with Gmail</Text> 
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default LoginScreen
