import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CompanyCard } from "../Cards/CompanyCard";
import { AdvisorCard } from "../Cards/AdvisorCard";
import { PromotedCard } from "../Cards/PromotedCard";
import { SessionCard } from "../Cards/SessionCard";
import { AdsCard } from "../Cards/AdsCard";
import { AdsCardImg } from "../Cards/AdsCardImg";
// import { Container, Content, Button, Text, Right } from "native-base";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
export default class ExploreScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Welcome {this.state.userData.email}</Text> */}
        <Button
          onPress={() => {
            AsyncStorage.removeItem("userData");
            AsyncStorage.removeItem("userToken");
            AsyncStorage.removeItem("config");
            this.props.userSignOut();
          }}
        >
          <Text>Logout</Text>
        </Button>
        <StatusBar style="auto" />
      </View>
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
