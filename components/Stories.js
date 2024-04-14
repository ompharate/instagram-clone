import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { users } from "../data/users.js";

const Stories = () => {
  return (
    <View style={{marginBottom:8}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users && users.length ? (
          users.map((story, index) => (
            <View style={{alignItems:"center"}} key={index}>
              <Image style={styles.story} source={{ uri: story.profile_image }} />
              <Text style={styles.storyName}>{
              story.username.length > 8 ? story.username.slice(0,8).toLowerCase()+".." : story.username
               }
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "white" }}>No story today</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft:6,
    borderWidth:2,
    borderColor:"#C13584"
  },
  storyName:{
    color:"white",
    fontSize:12,
    fontWeight:"500"
  }

});
export default Stories;
