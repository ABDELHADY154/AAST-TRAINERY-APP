import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import {
  CvCoach,
  InterviewCoach,
  CareerCa,
  Advisingcoach,
} from "./CareerCards";

export default class CareerCoaching extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <CvCoach />
          <InterviewCoach />
          <CareerCa />
          <Advisingcoach />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: "3%",
    // backgroundColor: "white",
  },
});
