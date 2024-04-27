import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";

import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, setDoc } from "firebase/firestore";

const SignupForm = () => {
  const SignupFormSchema = yup.object().shape({
    email: yup.string().email().required("An email is required"),
    username: yup
      .string()
      .required("Username is required")
      .min(7, "username must be at least 7 characters"),
    password: yup
      .string()
      .min(8, "your password must be at least 8 characters"),
  });

  const navigation = useNavigation();

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (email, username, password) => {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      await setDoc(doc(db, "users", authUser.user.email), {
        ownerId: authUser.user.uid,
        username: username,
        email: email,
        picture: await getRandomProfilePicture(),
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) =>
          onSignUp(values.email, values.username, values.password)
        }
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              ></TextInput>
            </View>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="username"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              ></TextInput>
            </View>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                keyboardType="default"
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              ></TextInput>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btnContainer}
            >
              <Text style={{ color: "white" }}>SignUp</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={{ color: "white" }}>Already have an account </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text
                  style={{
                    color: "#6BB0F5",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    padding: 10,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  btnContainer: {
    display: "flex",
    padding: 12,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#6BB0F5",
  },
  signUpContainer: {
    marginTop: 10,
    display: "flex",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
