import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik, formik } from "formik";
import validator from "email-validator";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const LoginFormSchema = yup.object().shape({
    email: yup.string().email().required("An email is required"),
    password: yup
      .string()
      .min(8, "your password must be at least 8 characters"),
  });

  const navigation = useNavigation();

  const onLogin = async (email, password) => {
   
      signInWithEmailAndPassword(auth, email, password).then((user) => {
        console.log("firebase login successful=>");
        
      }).catch((error) => {
        Alert.alert(error.message);
      });
  
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {      
        onLogin(values.email, values.password)}}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <Text style={{color:"red",padding:3}}>*{isValid ? null : "Enter Email Correct and 8 char password"}</Text>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number,username or email"
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
            <Pressable
              style={{
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#00a2ff" }}>Forgot password?</Text>
            </Pressable>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btnContainer}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text>Don't have an account </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignupScreen")}
              >
                <Text
                  style={{
                    color: "#6BB0F5",
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
