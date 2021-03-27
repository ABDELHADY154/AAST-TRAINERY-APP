import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
export function ActivityAcceptedS(props) {
  const navigation = useNavigation();
  return <ActivityAccepted navigation={navigation} {...props} />;
}

export default class ActivityAccepted extends Component {
  render() {
    return <Text>Accepted</Text>;
  }
}
