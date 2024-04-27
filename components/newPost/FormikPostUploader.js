import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { auth, db } from "../../firebase/config";
import { useEffect } from "react";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const PLACEHOLDER_IMG =
  "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg";

const uploadPostSchema = yup.object().shape({
  imageUrl: yup.string().url().required("a url is required"),
  caption: yup
    .string()
    .max(2200, "Caption has reached the character limit 2200")
    .required("Caption is required"),
});

const FormikPostUploader = () => {
  const navigation = useNavigation();
  const [placeHolderImage, setplaceHolderImage] = useState("");
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

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
    getUserName();
  }, []);

  const uploadPostToFile = async (imageUrl, caption) => {
  
    const userDocRef = doc(db, "users", currentLoggedInUser.email);
    addDoc(collection(userDocRef, "posts"), {
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      likes: 0,
      profile: currentLoggedInUser.picture,
      ownerEmail:currentLoggedInUser.email,
      ownerId: currentLoggedInUser.uid,
      caption: caption,
      createdAt: Date.now(),
      likes_by_user: [],
      comment: [],
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => uploadPostToFile(values.imageUrl, values.caption)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
      validateOnBlur={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: placeHolderImage ? placeHolderImage : PLACEHOLDER_IMG,
              }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                placeholder="Write a caption"
                placeholderTextColor="grey"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              ></TextInput>
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setplaceHolderImage(e.nativeEvent.text)}
            placeholder="Enter Image Url"
            placeholderTextColor="grey"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
            style={{
              color: "white",
              fontSize: 18,
            }}
          ></TextInput>
          {errors.imageUrl && (
            <Text style={{ color: "red" }}>{errors.imageUrl}</Text>
          )}
          <TouchableOpacity style={{
            padding:20,
            backgroundColor:"#00a2ff",
            borderRadius:10,
            alignItems:"center",
            justifyContent:"center"
          }} onPress={handleSubmit} disabled={!isValid}>
            <Text style={{ color: "white" }}>Share</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
