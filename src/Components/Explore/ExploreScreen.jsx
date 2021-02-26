import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { AdvisorCard } from "../Cards/AdvisorCard";
import { CompanyCard } from "../Cards/CompanyCard";
import { PromotedCard } from "../Cards/PromotedCard";
import { AdsCardImg } from "../Cards/AdsCardImg";
import { AdsCardImgOnly } from "../Cards/AdsCardImgOnly";
import { AdsCard } from "../Cards/AdsCard";
import { Feather } from "@expo/vector-icons";

export default class ExploreScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Button
            onlyIcon
            icon="menu"
            iconFamily="Ionicons"
            iconSize={40}
            color="transparent"
            iconColor="#1E4274"
            style={{
              width: 40,
              height: 40,
              // flex: 1,
              justifyContent: "flex-start",
            }}
            onPress={() => {
              AsyncStorage.removeItem("userData");
              AsyncStorage.removeItem("userToken");
              AsyncStorage.removeItem("config");
              this.props.logout();
            }}
          >
            menu
          </Button>

          <Text
            style={{
              justifyContent: "center",
              marginHorizontal: 100,
              fontSize: 16,
              color: "#1E4274",
              fontWeight: "bold",
            }}
          >
            Explore
          </Text>
          <Feather
            name="search"
            size={28}
            color="#1E4274"
            style={{
              marginRight: 10,
              // flex: 1,
              justifyContent: "flex-end",
            }}
            onPress={() => {
              this.props.navigation.navigate("Search");
            }}
          />
        </View>
        <ScrollView>
          <AdvisorCard />
          <CompanyCard />
          <AdsCard />
          <AdsCardImg />
          <AdsCardImgOnly />
          <PromotedCard />
        </ScrollView>
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
    // marginTop: 10,
    backgroundColor: "#fff",
  },
});
{
  /* <Button
            styel={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
            onPress={() => {
              AsyncStorage.removeItem("userData");
              AsyncStorage.removeItem("userToken");
              AsyncStorage.removeItem("config");
              this.props.logout();
            }}
          >
            <Text>Logout</Text>
          </Button> */
}
