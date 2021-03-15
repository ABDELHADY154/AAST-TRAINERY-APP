import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
export default class CareerCoaching extends Component {
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
              // justifyContent: "flex-start",
              marginRight: 95,
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
              // justifyContent: "center",
              // marginLeft: 115,
              marginRight: 90,
              fontSize: 16,
              color: "#1E4274",
              fontWeight: "bold",
            }}
          >
            Career Coaching
          </Text>
        </View>
        {/* <Button
          onPress={() => {
            AsyncStorage.removeItem("userData");
            AsyncStorage.removeItem("userToken");
            AsyncStorage.removeItem("config");
            this.props.userSignOut();
          }}
        >
          <Text>Profile Logout</Text>
        </Button> */}
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
