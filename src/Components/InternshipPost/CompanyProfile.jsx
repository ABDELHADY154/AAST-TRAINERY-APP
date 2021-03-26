import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";

import { Avatar, IconButton, Modal, Portal } from "react-native-paper";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { InternshipTap } from "./InternshipTap";
import { ReviewsTap } from "./ReviewsTap";
import { CompanyTap } from "./CompanyTap";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileImgLoader } from "../Loader/Loader";
import Spinner from "react-native-loading-spinner-overlay";

const Tab = createMaterialTopTabNavigator();

export default class CompanyProfile extends Component {
  state = {
    name: "",
    image: null,
    userData: {},
    loading: false,
    spinner: false,
  };

  async componentDidMount() {
    await axios
      .get("/A/student/studentImg")
      .then((response) => {
        this.setState({
          loading: true,
          userData: response.data.response.data,
        });
        this.props.getUserData(this.state.userData);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
    await axios
      .get("/W/student/company")
      .then((response) => {
        this.setState({
          loading: true,
          userData: response.data.response.data,
        });
        this.props.getUserData(this.state.userData);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <Spinner
          visible={this.state.spinner}
          cancelable={false}
          size="large"
          color="#1E4274"
          animation="fade"
          overlayColor="rgba(255, 255, 255, 0.8)"
          textStyle={{ color: "#1E4274", textAlign: "center" }}
        />
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
        <View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              {this.state.loading === false ? (
                <View>
                  <ProfileImgLoader />
                </View>
              ) : (
                <View>
                  <Avatar.Image
                    style={{
                      backgroundColor: "transparent",
                    }}
                    size={90}
                    source={{ uri: this.state.userData.image }}
                  />
                </View>
              )}
            </View>
            <View style={{ marginLeft: 15, marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#1E4274",
                  marginTop: 10,
                  // textAlign: "center",
                }}
              >
                {this.state.userData.company_name}
                company_name
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginBottom: 15,
                  // textAlign: "center",
                }}
              >
                {this.state.userData.fullName}
              </Text>
            </View>
          </View>
        </View>
        {/* Tabs */}
        <Tab.Navigator
          backBehavior="none"
          tabBarOptions={{
            activeTintColor: "#CD8930",
            inactiveTintColor: "#1E4274",
            indicatorStyle: { backgroundColor: "#CD8930" },
            labelStyle: { fontSize: 14 },
            style: { backgroundColor: "#F2F2F2" },
          }}
        >
          <Tab.Screen name="Company" component={CompanyTap} />
          <Tab.Screen name="Internship" component={InternshipTap} />
          <Tab.Screen name="Reviews" component={ReviewsTap} />
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
