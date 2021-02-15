import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../../assets/Images/logoWhite.png")} />
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E4275",
    justifyContent: "center",
  },
});
