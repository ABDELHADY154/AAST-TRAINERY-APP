import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CompanyCard } from "../Cards/CompanyCard";
import { AdvisorCard } from "../Cards/AdvisorCard";
import { PromotedCard } from "../Cards/PromotedCard";
import { SessionCard } from "../Cards/SessionCard";
import { AdsCard } from "../Cards/AdsCard";
import { AdsCardImg } from "../Cards/AdsCardImg";

export default class ExploreScreen extends Component {
  render() {
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <AdsCard />
            <AdsCardImg />
            <CompanyCard />
            <AdvisorCard />
            <PromotedCard />
            <SessionCard />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
