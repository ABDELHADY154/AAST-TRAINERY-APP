import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-paper";
import { Button } from "galio-framework";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ReviewsCard } from "./ReviewsCard";
const Tab = createMaterialTopTabNavigator();

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={{ backgroundColor: "#1E4274" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Button
              onlyIcon
              icon="menu"
              iconFamily="Ionicons"
              iconSize={40}
              color="transparent"
              iconColor="#fff"
              style={{
                width: 59,
                height: 59,
                marginRight: 90,
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
                alignItems: "center",
                marginRight: 165,
                fontSize: 16,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: -15 }}>
            <Avatar.Image
              size={110}
              source={require("../../assets/Images/Tutorials/Tutorial3.png")}
            />
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                marginTop: 10,
                marginBottom: 15,
              }}
            >
              Basma Mostafa
            </Text>
          </View>
        </View>
        {/* Tabs */}
        <Tab.Navigator
          backBehavior="none"
          style={{ backgroundColor: "#1E4274" }}
        >
          <Tab.Screen name="Personal Info" component={PersonalTab} />
          <Tab.Screen name="Experience" component={ExperienceTab} />
        </Tab.Navigator>

        <StatusBar style="auto" />
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

export class PersonalTab extends Component {
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
                    fontSize: 22,
                    color: "#1E4274",
                    fontWeight: "bold",
                  }}
                >
                  Track your profile
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    width: "90%",
                  }}
                >
                  Check out these steps for a professional Profile
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                  }}
                >
                  Steps to complete your profile
                </Text>
              </View>
              {/* <View style={{ flex: 1 }}>
            <ProgressSteps
              progressBarColor="blue"
              borderWidth={8}
              // activeStepIconBorderColor="blue"
              activeStepIconBorderColor="blue"
              activeStepIconColor="red"
              activeStepNumColor="#fff"
              completedCheckColor="orange"
              // activeStep="#000"
            >
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
              <ProgressStep>
                <View>
                  <Text>This is the content within step 1!</Text>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View> */}
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                Complete your general information
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#CD8930",
                    fontWeight: "bold",
                    marginRight: 135,
                  }}
                >
                  Personal Information
                </Text>
                <Feather name="edit" size={24} color="#1E4274" />
              </View>
              <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    gender
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    age
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    nationality
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    address
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    // marginRight: 145,
                    fontSize: 18,
                    color: "#CD8930",
                    fontWeight: "bold",
                    marginRight: 143,
                    //   alignItems: "flex-start",
                    //   justifyContent: "flex-start",
                    //   alignItems: "flex-start",
                  }}
                >
                  Contact Information
                </Text>
                <Feather
                  name="edit"
                  size={24}
                  color="#1E4274"
                  // style={{
                  //   alignItems: "flex-end",
                  //   justifyContent: "flex-end",
                  //   alignItems: "flex-end",
                  // }}
                />
              </View>
              <View style={{ marginTop: 7 }}>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    01012355664
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
                      fontSize: 16,
                      color: "#1E4274",
                      width: "80%",
                    }}
                  >
                    CollegeEmail@college.edu
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    // marginRight: 145,
                    fontSize: 18,
                    color: "#CD8930",
                    fontWeight: "bold",
                    marginRight: 117,
                    //   alignItems: "flex-start",
                    //   justifyContent: "flex-start",
                    //   alignItems: "flex-start",
                  }}
                >
                  Academics Information
                </Text>
                <Feather
                  name="edit"
                  size={24}
                  color="#1E4274"
                  // style={{
                  //   alignItems: "flex-end",
                  //   justifyContent: "flex-end",
                  //   alignItems: "flex-end",
                  // }}
                />
              </View>
              <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                      width: "80%",
                    }}
                  >
                    Arab Academy for science and technology
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                      width: "80%",
                    }}
                  >
                    Business Information Systems
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    3.89
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    2017-2021
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text
                    style={{
                      // marginRight: 145,
                      fontSize: 16,
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
                      fontSize: 16,
                      color: "#1E4274",
                    }}
                  >
                    7
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    // marginRight: 145,
                    fontSize: 18,
                    color: "#CD8930",
                    fontWeight: "bold",
                    marginRight: 230,
                  }}
                >
                  Accounts
                </Text>
                <Feather name="edit" size={24} color="#1E4274" />
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
                    fontSize: 18,
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
        <StatusBar style="auto" />
      </View>
    );
  }
}

export class ExperienceTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          ExperienceTab
        </Text>

        <StatusBar style="auto" />
      </View>
    );
  }
}
