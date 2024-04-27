import { StyleSheet, Text, View } from "react-native";
import AuthNavigation from "./AuthNavigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthNavigation />
    </>
  );
}

const styles = StyleSheet.create({});
