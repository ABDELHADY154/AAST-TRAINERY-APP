import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import GeneralInfo from "../Profile/Generalinfo/Generalinfo";

const Drawer = createDrawerNavigator();

export default class DrawerMenu extends Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName="Edit Profile">
        <Drawer.Screen name="Edit Profile" component={GeneralInfo} />
      </Drawer.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
