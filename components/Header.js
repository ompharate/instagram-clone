import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../assets/images/instatext.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate("NewPostScreen")}>
          <Feather name="plus-square" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="heart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.unReadBadge}>
                <Text style={styles.unReadBadgeText}>12</Text>
            </View>
          <FontAwesome5 name="facebook-messenger" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  logo: {
    width: 100,
    height: 50,
  },
  iconContainer: {
    width: 100,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  unReadBadge:{
    backgroundColor:"#FF3250",
    position:"absolute",
    left:10,
    bottom:16,
    width:20,
    height:18,
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"    ,
    zIndex:100
  },
  unReadBadgeText:{
    color:"white",
    fontWeight:"bold",
    fontSize:10
  }
});
