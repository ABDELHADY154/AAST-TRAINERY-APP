import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { InternshipTabb } from "./InternshipTabb";
import { ProfileTab } from "./ProfileTab";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileImgLoader } from "../Loader/Loader";
import Spinner from "react-native-loading-spinner-overlay";

const Tab = createMaterialTopTabNavigator();

export default class AdvisorProfile extends Component {
  state = {
    name: "",
    image: null,
    userData: {},
    loading: false,
    spinner: true,
  };

  async componentDidMount() {
    await axios
      .get("/A/student/studentImg")
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          userData: response.data.response.data,
        });
        this.props.getUserData(this.state.userData);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
    await axios
      .get("/W/student/company/10")
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          userData: response.data.response.data,
        });
        console.log(error.response.data);
        this.props.getUserData(this.state.userData);
      })
      .catch(function (error) {
        this.setState({
          spinner: false,
        });
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
                advisooooooor
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
          <Tab.Screen name="Profile" component={ProfileTab} />
          <Tab.Screen name="Internship" component={InternshipTabb} />
          {/* <Tab.Screen name="Reviews" component={ReviewsTap} /> */}
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