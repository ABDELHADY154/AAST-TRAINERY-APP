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
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export function ProfileTab(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <ProfileTabScreen navigation={navigation} {...props} route={route} />;
}
class ProfileTabScreen extends Component {
  state = {
    userData: {},
    loading: false,
  };
  async componentDidMount() {
    await axios
      .get(`/W/student/company/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
        });
        console.log(response.data.response.data);
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
    // console.log(this.props.route.params.id);
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
                    color: "#1E4274",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Advisor Profile
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1E4274",
                    lineHeight: 20,
                  }}
                >
                  {this.state.userData.company_desc}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Advisor Info
                </Text>
              </View>
              <View style={{ marginTop: 7 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={22}
                      color="#CD8930"
                    />
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#CD8930",
                      width: "80%",
                    }}
                  >
                    {this.state.userData.email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      // marginLeft: -2,
                      marginRight: 4,
                    }}
                  >
                    <Ionicons
                      name="ios-people-outline"
                      size={24}
                      color="#1E4274"
                    />
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      width: "80%",
                      marginTop: 4,
                    }}
                  >
                    BIS Department
                    {/* {this.state.userData.email} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      // marginLeft: -2,
                      marginRight: 4,
                    }}
                  >
                    <Ionicons
                      name="ios-people-outline"
                      size={24}
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
                    AAST - CMT
                    {/* {this.state.userData.email} */}
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
