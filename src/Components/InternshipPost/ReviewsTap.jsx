import React, { Component, useState, useEffect, useRef } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Card,
  // Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { ProgrossBarLoader } from "../Loader/Loader";

// import { ReviewsCard } from "./ReviewsCard";
import * as Progress from "react-native-progress";

export function ReviewsTap(props) {
  const navigation = useNavigation();
  return <ReviewsTapScreen navigation={navigation} {...props} />;
}
class ReviewsTapScreen extends Component {
  state = {
    progressWithOnComplete: 0,
    progressCustomized: 0,
    userData: {},
    loading: false,
  };
  async componentDidMount() {
    await axios
      .get("/A/student/get-profilePersonal")
      .then((response) => {
        this.setState({
          loading: true,
          userData: response.data.response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.userData);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingHorizontal: 15, marginBottom: 15 }}>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#CD8930",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Personal Information
                </Text>
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  onPress={() => {
                    this.props.navigation.push("GeneralForm");
                  }}
                  style={{ justifyContent: "flex-end" }}
                />
              </View>
              <View style={{ marginTop: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 2,
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Gender:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.gender}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 2,
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Age:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.age}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 2,
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Nationality:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.nationality}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Address:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.city} , {this.state.userData.country}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#CD8930",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Contact Information
                </Text>
              </View>
              <View style={{ marginTop: 7 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 2,
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      marginRight: 7,
                      marginLeft: -1,
                    }}
                  >
                    <Feather name="smartphone" size={22} color="#1E4274" />
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.phone_number}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      marginRight: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={22}
                      color="#1E4274"
                    />
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      width: "80%",
                    }}
                  >
                    {this.state.userData.email}
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
    backgroundColor: "#fff",
  },
});
