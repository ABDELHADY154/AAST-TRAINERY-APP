import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { CvCard, InterviewCard, CareerCard, AdvisingCard } from "./CareerCards";

export default class CareerCoaching extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <CvCard />
          <InterviewCard />
          <CareerCard />
          <AdvisingCard />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
