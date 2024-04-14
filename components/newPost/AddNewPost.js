import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FormikPostUploader from "./FormikPostUploader";
import { useNavigation } from "@react-navigation/native";
const AddNewPost = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FormikPostUploader/>
    </View>
  );
};

const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
      <Ionicons name="arrow-back-sharp" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerText}>ADD NEW POST</Text>
    <Text></Text>
  </View>
);

export default AddNewPost;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText:{
    color:"#fff",
    fontWeight:"700",
    fontSize:16,
  }
});
