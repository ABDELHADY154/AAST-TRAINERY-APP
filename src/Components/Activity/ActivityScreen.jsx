import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import ActivitySavedS from "./ActivitySaved";
import ActivityAppointmentS from "./ActivityAppointment";
import ActivityAcceptedS from "./ActivityAccepted";

import ActivityApplieds from "./ActivityApplied";

export function ActivityScreens(props) {
  const navigation = useNavigation();
  return <ActivityScreen navigation={navigation} {...props} />;
}

const Tab = createMaterialTopTabNavigator();

export default class ActivityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Tabs */}
        <Tab.Navigator
          backBehavior="none"
          tabBarOptions={{
            activeTintColor: "#CD8930",
            inactiveTintColor: "#1E4274",
            indicatorStyle: { backgroundColor: "#CD8930" },
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: "#fff" },
          }}
        >
          <Tab.Screen name="Applied" component={ActivityApplieds} />
          <Tab.Screen name="Accepted" component={ActivityAcceptedS} />
          <Tab.Screen name="Saved" component={ActivitySavedS} />
          <Tab.Screen name="Sessions" component={ActivityAppointmentS} />
        </Tab.Navigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
