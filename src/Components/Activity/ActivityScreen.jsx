import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActivityAccepted from "./ActivityAccepted";
import ActivitySaved from "./ActivitySaved";
import ActivityAppointment from "./ActivityAppointment";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
export default class ActivityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: "20%" }}>
          <Tab.Navigator
            backBehavior="none"
            tabBarOptions={{
              activeTintColor: "#CD8930",
              inactiveTintColor: "#1E4274",
              indicatorStyle: { backgroundColor: "#CD8930" },
              labelStyle: { fontSize: 14 },
              style: { backgroundColor: "#fff", alignSelf: "center" },
            }}
          >
            {/* <Tab.Screen name="Activity" component={ActivityScreen} /> */}
            <Tab.Screen name="Activity Accepted" component={ActivityAccepted} />
            <Tab.Screen name="Activity Saved" component={ActivitySaved} />
            <Tab.Screen
              name="ActivityAppointment"
              component={ActivityAppointment}
            />
          </Tab.Navigator>
        </View>
        <Text>TEXTTTTTTTTTT</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    // alignSelf: "center",
    // marginTop: 10,
    backgroundColor: "#fff",
  },
});
