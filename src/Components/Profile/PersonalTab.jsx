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
  AntDesign,
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

import { ReviewsCard } from "./ReviewsCard";
import * as Progress from "react-native-progress";

export function PersonalTab(props) {
  const navigation = useNavigation();
  return <PersonalTabForm navigation={navigation} {...props} />;
}
class PersonalTabForm extends Component {
  state = {
    progressWithOnComplete: 0,
    progressCustomized: 0,
    userData: {},
    loading: false,
  };
  async componentDidMount() {
    await axios
      .get("/A/student/get-profilePersonal")
      .then(response => {
        this.setState({
          loading: true,
          userData: response.data.response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // console.log(this.state.userData);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingHorizontal: 15, marginBottom: 15 }}>
            <View
              accessible={true}
              accessibilityLabel=" Track your profile"
              accessibilityHint=" Complete your general information"
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
                {this.state.loading === false ? (
                  <View>
                    <ProgrossBarLoader />
                  </View>
                ) : (
                  <Progress.Bar
                    progress={this.state.userData.profile_score}
                    width={310}
                    color={"#1E4274"}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#1E4274",
                  marginBottom: 10,
                }}
                onPress={() => {
                  this.props.navigation.push("GeneralForm");
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
                  }}
                >
                  Personal Information
                </Text>
                <MaterialIcons
                  accessible={true}
                  accessibilityLabel="edit Personal and contact Information"
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  style={{ padding: 30 }}
                  onPress={() => {
                    this.props.navigation.push("GeneralForm");
                  }}
                  style={{ justifyContent: "flex-end" }}
                />
              </View>
              <View style={{ marginTop: 5 }}>
                <View
                  accessible={true}
                  accessibilityLabel="Gender:"
                  accessibilityHint={this.state.userData.gender}
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
                  accessible={true}
                  accessibilityLabel={this.state.userData.age}
                  accessibilityHint={this.state.userData.age}
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
                  accessible={true}
                  accessibilityLabel="nationality:"
                  accessibilityHint={this.state.userData.nationality}
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
                <View
                  accessible={true}
                  accessibilityLabel={this.state.userData.city}
                  accessibilityHint={this.state.userData.country}
                  style={{ flexDirection: "row", marginBottom: 2 }}
                >
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
                  accessible={true}
                  accessibilityLabel="phone number"
                  accessibilityHint={this.state.userData.phone_number}
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
                <View
                  accessible={true}
                  accessibilityLabel="email"
                  accessibilityHint={this.state.userData.email}
                  style={{ flexDirection: "row", marginBottom: 2 }}
                >
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
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
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
                  accessible={true}
                  accessibilityLabel="edit Academics Information"
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  onPress={() => {
                    this.props.navigation.push("AcademicForm");
                  }}
                  style={{ justifyContent: "flex-end" }}
                />
              </View>
              <View style={{ marginTop: 5 }}>
                <View
                  accessible={true}
                  accessibilityLabel="university:"
                  accessibilityHint={this.state.userData.university}
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
                    University:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      width: "78%",
                    }}
                  >
                    {this.state.userData.university}
                  </Text>
                </View>
                <View
                  accessible={true}
                  accessibilityLabel="department:"
                  accessibilityHint={this.state.userData.department}
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
                    Department:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      width: "80%",
                    }}
                  >
                    {this.state.userData.department}
                  </Text>
                </View>
                <View
                  accessible={true}
                  accessibilityLabel={this.state.userData.gpa}
                  accessibilityHint={this.state.userData.gpa}
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
                    GPA:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.gpa}
                  </Text>
                </View>
                <View
                  accessible={true}
                  accessibilityLabel={this.state.userData.start_year}
                  accessibilityHint={this.state.userData.end_year}
                  style={{ flexDirection: "row", marginBottom: 5 }}
                >
                  <Text
                    style={{
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
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.state.userData.start_year} -{" "}
                    {this.state.userData.end_year}
                  </Text>
                </View>
                <View
                  accessible={true}
                  accessibilityLabel={this.state.userData.period}
                  accessibilityHint={this.state.userData.period}
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
                    Term:
                  </Text>
                  <Text
                    style={{
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
                  accessible={true}
                  accessibilityLabel="edit social Accounts"
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  onPress={() => {
                    this.props.navigation.push("AccountForm");
                  }}
                  style={{ justifyContent: "flex-end" }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  {this.state.userData.accounts ? (
                    <>
                      {this.state.userData.accounts.facebook ? (
                        <FontAwesome
                          accessible={true}
                          accessibilityLabel="navigate to facebook account"
                          name="facebook"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.facebook,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                      {this.state.userData.accounts.instagram ? (
                        <Feather
                          accessible={true}
                          accessibilityLabel="navigate to instagram account"
                          name="instagram"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.instagram,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                      {this.state.userData.accounts.youtube ? (
                        <FontAwesome5
                          accessible={true}
                          accessibilityLabel="navigate to youtube account"
                          name="youtube"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.youtube,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                      {this.state.userData.accounts.linkedin ? (
                        <FontAwesome5
                          accessible={true}
                          accessibilityLabel="navigate to linkedin account"
                          name="linkedin-in"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.linkedin,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                      {this.state.userData.accounts.behance ? (
                        <AntDesign
                          name="behance-square"
                          accessible={true}
                          accessibilityLabel="navigate to behance account"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.behance,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                      {this.state.userData.accounts.github ? (
                        <FontAwesome
                          accessible={true}
                          accessibilityLabel="navigate to github account"
                          name="github"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.github,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                      {this.state.userData.accounts.website ? (
                        <Entypo
                          accessible={true}
                          accessibilityLabel="navigate to website link"
                          name="link"
                          size={28}
                          color="#1E4274"
                          style={{ marginRight: 25 }}
                          onPress={() => {
                            Linking.openURL(
                              this.state.userData.accounts.website,
                            );
                          }}
                        />
                      ) : (
                        <Text></Text>
                      )}
                    </>
                  ) : (
                    <Text></Text>
                  )}
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
                    marginBottom: 10,
                  }}
                >
                  Reviews
                </Text>
              </View>
              <View style={{ marginBottom: "-5%" }}>
                <Swiper
                  height={220}
                  dotColor="#CCCCCC"
                  activeDotColor="#CD8930"
                >
                  <ReviewsCard />
                  <ReviewsCard />
                  <ReviewsCard />
                </Swiper>
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
