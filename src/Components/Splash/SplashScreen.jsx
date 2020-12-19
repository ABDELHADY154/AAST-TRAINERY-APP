import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/Images/logo.png")}
          style={styles.logo}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#1E4275",
    backgroundColor: "white",

    justifyContent: "center",
  },
  logo: {
    height: 84,
    width: 257,
  },
});
