import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottonTabs from "../components/BottonTabs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
const Profile = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const getUserName = async () => {
    const user = await auth.currentUser;
    const q = query(collection(db, "users"), where("ownerId", "==", user.uid));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCurrentLoggedInUser({
          uid: user.uid,
          username: doc.data().username,
          email: doc.data().email,
          picture: doc.data().picture,
        });
      });
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const currentUserEmail = auth.currentUser.email;

      try {
        const userDocRef = doc(db, "users", currentUserEmail);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userPostsCollection = collection(userDocRef, "posts");

          onSnapshot(userPostsCollection, (snapshot) => {
            const postsData = snapshot.docs.map((post) => ({
              id: post.id,
              ...post.data(),
            }));

            setPosts(postsData);
          });
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error getting user document:", error);
      }
    };
    getUserName();
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Text
          style={{
            color: "white",
            padding: 0,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {currentLoggedInUser?.username}
        </Text>
        <AntDesign
          onPress={async () => await signOut(auth)}
          name="logout"
          size={24}
          color="white"
        />
      </View>
      <ScrollView>
        <View>
          <View>
            <Image
              style={{ width: 80, height: 80, borderRadius: 40 }}
              source={{ uri: currentLoggedInUser?.picture }}
            />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          {posts.map((post,index) => (
            <View key={index}>
              <Image
                style={{ width: 170, height: 210 }}
                source={{ uri: post.imageUrl }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <BottonTabs />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
