import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../components/LoginScreen/LoginForm';

const INSTAGRAM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
            <Image source={{uri:INSTAGRAM_LOGO,height:80,width:80}} style/>
      </View>
    {/* loginForm */}
    <LoginForm/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingTop:50,
        paddingHorizontal:12,
        
    },

    imageContainer:{
        alignItems:"center",
        marginTop:50,
    }
})