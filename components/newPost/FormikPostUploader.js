import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { isValidElement, useState } from "react";
import * as yup from "yup";
import { Formik, formik } from "formik";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Divider } from "react-native-elements";
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
  const [placeHolderImage, setplaceHolderImage] = useState("");
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => console.log(values)}
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
                uri: placeHolderImage
                  ? placeHolderImage
                  : PLACEHOLDER_IMG,
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
          <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
            <Text style={{ color: "white" }}>Share</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
