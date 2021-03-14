import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { IconButton } from "react-native-paper";
import { axios } from "../../Config/Axios";

import {
  AdvisorCard,
  CompanyCard,
  PromotedCard,
  AdsCardImg,
  AdsCardImgOnly,
  AdsCard,
} from "../Cards/Cards";

import { Feather } from "@expo/vector-icons";
export default class ExploreScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "#fff",
          }}
        ></View> */}
        {/* title: title,
                    headerStyle: {
                      backgroundColor: "white",
                    },
                    headerTintColor: "#1E4274",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 20,
                    },
                    headerLeft: () => (
                      <IconButton
                        icon="menu"
                        type="text"
                        size={40}
                        color="#1E4274"
                        onPress={() => {
                          AsyncStorage.removeItem("userData");
                          AsyncStorage.removeItem("userToken");
                          AsyncStorage.removeItem("config");
                          axios.defaults.headers.common["Authorization"] = ``;
                          dispatch({ type: "SIGN_OUT" });
                        }}
                      />
                    ),
                    headerRight: () => (
                      <Feather
                        name="search"
                        size={28}
                        color="#1E4274"
                        style={{
                          marginRight: 15,
                        }}
                        onPress={() => {
                          this.props.navigation.navigate("Search");
                        }}
                      />
                    ), */}
        {/* <View
          style={{
            marginTop: 40,
            width: "100%",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="menu"
            type="text"
            size={40}
            color="#1E4274"
            style={
              {
                // alignSelf: "flex-start",
                // alignContent: "flex-start",
                // flex: 1,
                // marginRight: -14,
                // width: "30%",
                // alignSelf: "center",
                // flex: 4,
                // marginRight: 110,
              }
            }
            onPress={() => {
              AsyncStorage.removeItem("userData");
              AsyncStorage.removeItem("userToken");
              AsyncStorage.removeItem("config");
              axios.defaults.headers.common["Authorization"] = ``;
              this.props.logout();
            }}
          />
          <Text
            style={
              {
                // flex: 1,
                // // width: "30%",
                // // flex: 3,
                // justifyContent: "center",
                // // marginLeft: 110,
                // // alignItems: "center",
                // // marginRight: 115,
                // fontSize: 16,
                // alignSelf: "center",
                // color: "#1E4274",
                // fontWeight: "bold",
              }
            }
          >
            Explore
          </Text>
          <Feather
            name="search"
            size={28}
            color="#1E4274"
            style={
              {
                // flex: 1,
                // alignSelf: "center",
                // width: "30%",
                // flex: 4,
                // marginLeft: 30,
                // flex: 1,
                // justifyContent: "flex-end",
              }
            }
            onPress={() => {
              this.props.navigation.navigate("Search");
            }}
          />
        </View> */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35,
            width: "100%",
          }}
        >
          <IconButton
            icon="menu"
            type="text"
            size={40}
            color="#1E4274"
            style={{
              flex: 1,
              // marginRight: -14,
              // width: "30%",
              alignSelf: "center",
              // flex: 4,
              // marginRight: 110,
            }}
            onPress={() => {
              AsyncStorage.removeItem("userData");
              AsyncStorage.removeItem("userToken");
              AsyncStorage.removeItem("config");
              axios.defaults.headers.common["Authorization"] = ``;
              this.props.logout();
            }}
          />

          <Text
            style={{
              flex: 1,
              // width: "30%",
              // flex: 3,
              justifyContent: "center",
              // marginLeft: 110,
              // alignItems: "center",
              // marginRight: 115,
              fontSize: 16,
              alignSelf: "center",
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
              flex: 1,
              alignSelf: "center",
              // width: "30%",
              // flex: 4,
              // marginLeft: 30,
              // flex: 1,
              // justifyContent: "flex-end",
            }}
            onPress={() => {
              this.props.navigation.navigate("Search");
            }}
          />
        </View> */}
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
    // flex: 1,
    width: "100%",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
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
