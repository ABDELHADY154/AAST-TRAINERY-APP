import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
export default class Settings extends Component {
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
          }}
        >
          Account Settings
        </Text>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#CCCCCC",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                onPress={() => {
                  this.props.navigation.navigate("ChangePassword");
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: "#1E4274",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Change Password
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#CCCCCC",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                // onPress={this.onPress}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: "#1E4274",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Update E-mail
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#CCCCCC",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                // onPress={this.onPress}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: "#1E4274",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    My Subscriptions
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#CCCCCC",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                // onPress={this.onPress}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: "#1E4274",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Ad-Cancellation
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#CCCCCC",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                // onPress={this.onPress}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: "#1E4274",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Delete Account{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
