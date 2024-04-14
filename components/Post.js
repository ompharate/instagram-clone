import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 13 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        {/* <Divider width={1} orientation="vertical"></Divider> */}
        <PostFooter post={post} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={styles.story} source={{ uri: post.profile_pic_url }} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <View>
      <Text style={{ color: "white", fontWeight: "900", fontSize: 22 }}>
        ...
      </Text>
    </View>
  </View>
);
const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 350,
    }}
  >
    <Image
      style={{ height: "100%", resizeMode: "contain" }}
      source={{ uri: post.imageUrl }}
    ></Image>
  </View>
);
const PostFooter = ({ post }) => (
  <View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          //   padding: 8,
        }}
      >
        <TouchableOpacity style={styles.icons}>
          <AntDesign name="hearto" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons}>
          <FontAwesome name="comment-o" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons name="archive" size={24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);
const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>{post.caption}</Text>
  </View>
);
const Likes = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 2,
    }}
  >
    <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
      {post.likes.toLocaleString("en")} Likes
    </Text>
  </View>
);
const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length}
        {post.comments.length > 1 ? " comments" : " comment"}
      </Text>
    )}
  </View>
);
const Comments = ({ post }) => (
  <View>
    {post.comments.map((comment, index) => (
      <View style={{flexDirection:"row",marginTop:5}} key={index}>
        <Text style={{ color: "grey", fontWeight: "600" }}>
          {comment.user}
          <Text style={{ color: "grey",fontWeight:"400"}}> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </View>
);
export default Post;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#C13584",
  },
  icons: {
    margin: 6,
  },
});
