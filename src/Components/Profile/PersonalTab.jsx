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

import { useNavigation } from "@react-navigation/native";

import { ReviewsCard } from "./ReviewsCard";
import * as Progress from "react-native-progress";

export function PersonalTab(props) {
  const navigation = useNavigation();
  return <PersonalTabForm navigation={navigation} {...props} />;
}
class PersonalTabForm extends Component {
  state = {
    // fullName: "",
    progressWithOnComplete: 0,
    progressCustomized: 0,
    userData: {},
  };
  async componentDidMount() {
    await axios
      .get("/A/student/get-profilePersonal")
      .then((response) => {
        this.setState({
          userData: response.data.response.data,
        });
        console.log(response.data.response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingHorizontal: 15, marginBottom: 15 }}>
            <View
              style={{
                backgroundColor: "#F2F2F2",
                marginHorizontal: -15,
                paddingLeft: 15,
                paddingTop: 15,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    fontWeight: "bold",
                  }}
                >
                  Track your profile
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#1E4274",
                    width: "90%",
                    marginVertical: 5,
                  }}
                >
                  Check out these steps for a professional Profile
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#1E4274",
                  }}
                >
                  Steps to complete your profile
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 10,
                }}
              >
                <Progress.Bar
                  progress={this.state.userData.profile_score}
                  width={310}
                  color={"#1E4274"}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#1E4274",
                  marginBottom: 10,
                }}
              >
                Complete your general information
              </Text>
            </View>
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
                    // marginRight: 135,
                  }}
                >
                  Personal Information
                </Text>
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  onPress={() => {
                    this.props.navigation.navigate("Interests");
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
                    // marginRight: 145,
                    fontSize: 16,
                    color: "#CD8930",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Contact Information
                </Text>
                {/* <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  style={{ justifyContent: "flex-end" }}
                /> */}
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
                      // marginRight: 145,
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
                      // marginRight: 145,
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
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    // marginRight: 145,
                    fontSize: 16,
                    color: "#CD8930",
                    fontWeight: "bold",
                    marginRight: 117,
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Academics Information
                </Text>
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
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
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    University:
                  </Text>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      width: "78%",
                    }}
                  >
                    {this.state.userData.country}
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
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Department:
                  </Text>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      width: "80%",
                    }}
                  >
                    {this.state.userData.department}
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
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    GPA:
                  </Text>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.gpa}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Class:
                  </Text>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  ></Text>
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
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                      fontWeight: "bold",
                      marginRight: 5,
                    }}
                  >
                    Term:
                  </Text>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.period}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    // marginRight: 145,
                    fontSize: 16,
                    color: "#CD8930",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Accounts
                </Text>
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  style={{ justifyContent: "flex-end" }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome
                    name="facebook"
                    size={28}
                    color="#1E4274"
                    style={{ marginRight: 25 }}
                  />
                  <Feather
                    name="instagram"
                    size={28}
                    color="#1E4274"
                    style={{ marginRight: 25 }}
                  />
                  <FontAwesome5
                    name="youtube"
                    size={28}
                    color="#1E4274"
                    style={{ marginRight: 25 }}
                  />
                  <FontAwesome5
                    name="linkedin-in"
                    size={28}
                    color="#1E4274"
                    style={{ marginRight: 25 }}
                  />
                  <FontAwesome
                    name="github"
                    size={28}
                    color="#1E4274"
                    style={{ marginRight: 25 }}
                  />
                  <Entypo
                    name="link"
                    size={28}
                    color="#1E4274"
                    style={{ marginRight: 25 }}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    // marginRight: 145,
                    fontSize: 16,
                    color: "#CD8930",
                    fontWeight: "bold",
                    // marginRight: 145,
                  }}
                >
                  Reviews
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <ReviewsCard />
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" />
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
