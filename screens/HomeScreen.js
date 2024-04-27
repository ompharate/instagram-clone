import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Stories from "../components/Stories";
import Post from "../components/Post";

import BottonTabs from "../components/BottonTabs";
import { useNavigation } from "@react-navigation/native";
import { collectionGroup, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({
            id: post.id, ...post.data()
          }))
        );
      });
    };
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Stories />
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottonTabs />
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
