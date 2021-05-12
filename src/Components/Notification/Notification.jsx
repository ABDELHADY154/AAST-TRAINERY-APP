import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default class Notification extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginVertical: 10 }}>
            {/* rejection notification */}
            <View
              style={{
                width: "99%",
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#F44336",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Feather
                  name="x-octagon"
                  size={24}
                  color="#F44336"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    Unfortunately, you were rejected in the applied internship
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information{" "}
                  </Text>
                </View>
              </View>
            </View>
            {/* session review notification */}
            <View
              style={{
                width: "99%",
                // height: 50,
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#007BC2",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Feather
                  name="alert-circle"
                  size={24}
                  color="#007BC2"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    Review your finished session{" "}
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information{" "}
                  </Text>
                </View>
              </View>
            </View>
            {/* recommended notification */}
            <View
              style={{
                width: "99%",
                // height: 50,
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#007BC2",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Feather
                  name="alert-circle"
                  size={24}
                  color="#007BC2"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    You have a recomendation to apply for an internship
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information
                  </Text>
                </View>
              </View>
            </View>
            {/* accepted notification */}
            <View
              style={{
                width: "99%",
                // height: 50,
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#4CAF50",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color="#4CAF50"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    Congratulations you got accepted in the applied internship{" "}
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information
                  </Text>
                </View>
              </View>
            </View>
            {/* booked session notification */}
            <View
              style={{
                width: "99%",
                // height: 50,
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#4CAF50",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color="#4CAF50"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    Your session has been booked successfully{" "}
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information
                  </Text>
                </View>
              </View>
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
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
