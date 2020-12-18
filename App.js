import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

export default class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      "sf-font": require("./assets/fonts/AbhayaLibre-Bold.ttf"),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontFamily: "sf-font" }}>
          AAST TRAINERY
        </Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
