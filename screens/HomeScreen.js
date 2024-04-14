import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Stories from "../components/Stories";
import Post from "../components/Post";
import { posts } from "../data/post";
import BottonTabs from "../components/BottonTabs";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
      <Stories />
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottonTabs/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
