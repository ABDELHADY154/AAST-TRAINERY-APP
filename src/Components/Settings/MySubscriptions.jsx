import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Input } from "react-native-elements";
import { Button } from "galio-framework";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
const SwitchButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: "#1E4274",
          true: "#1E4274",
        }}
        // style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.4 }] }}
        thumbColor={isEnabled ? "#1E4274" : "#fff"}
        ios_backgroundColor="#1E4274"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};
export default class MySubscriptions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "3%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: "5.4%",
            color: "#CD8930",
            fontSize: 24,
            fontFamily: "SF-M",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          My Subscriptions
        </Text>
        <ScrollView>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <View
              style={{
                borderBottomColor: "#1E4274",
                borderBottomWidth: 2,
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -4,
                  marginTop: 15,
                  marginLeft: "-2%",
                }}
              >
                Mail subscriptions for newsletter
              </Text>
              <SwitchButton />
            </View>

            <Button
              style={{ width: "auto", borderRadius: 50, marginTop: 40 }}
              color="#1E4275"
              // onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
});
