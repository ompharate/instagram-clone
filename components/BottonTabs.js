import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const tabs = [
  {
    name: "HomeScreen",
    icon: <Entypo name="home" size={24} color="white" />,
  },
  {
    name: "search",
    icon: <AntDesign name="search1" size={24} color="white" />,
  },
  {
    name: "reel",
    icon: <Entypo name="video" size={24} color="white" />,
  },
  {
    name: "Profile",
    icon: <MaterialIcons name="account-circle" size={24} color="white" />,
  },
];

const BottonTabs = () => {
  return (
    <View>
      <Divider width={1} orientation="vertical" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: 50,
        }}
      >
        {tabs.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const Icon = ({ icon }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(icon.name)}>
      {icon.icon}
    </TouchableOpacity>
  );
};
export default BottonTabs;

const styles = StyleSheet.create({});
