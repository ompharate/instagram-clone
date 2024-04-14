import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor:'black',flex:1}}>
      <AddNewPost/>
    </SafeAreaView>
  )
}

export default NewPostScreen

const styles = StyleSheet.create({})