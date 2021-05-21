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
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

export function CompanyTap(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <CompanyTapScreen navigation={navigation} {...props} route={route} />;
}
class CompanyTapScreen extends Component {
  state = {
    progressWithOnComplete: 0,
    progressCustomized: 0,
    userData: {},
    loading: false,
  };
  async componentDidMount() {
    await axios
      .get(`/A/student/company/${this.props.route.params.id}`)
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
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  }
  render() {
    console.log(this.props.route.params.id);
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
                  Company Profile
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
                  Company Info
                </Text>
              </View>
              <View style={{ marginTop: 7 }}>
                <View
                  accessible={true}
                  accessibilityLabel="company phone number"
                  accessibilityHint={this.state.userData.phone_number}
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      marginRight: 7,
                      marginLeft: -1,
                    }}
                  >
                    <AntDesign name="phone" size={22} color="#CD8930" />
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#CD8930",
                    }}
                  >
                    {this.state.userData.phone_number}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", marginBottom: 10 }}
                  accessible={true}
                  accessibilityLabel="company email"
                  accessibilityHint={this.state.userData.email}
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
                  style={{ flexDirection: "row", marginBottom: 10 }}
                  accessible={true}
                  accessibilityLabel="company location"
                  accessibilityHint={this.state.userData.address}
                >
                  <Text
                    style={{
                      marginLeft: -2,
                      marginRight: 3,
                    }}
                  >
                    <Ionicons
                      name="location-outline"
                      size={26}
                      color="#CD8930"
                    />
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(this.state.userData.address);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#CD8930",
                      }}
                    >
                      Location
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ flexDirection: "row", marginBottom: 10 }}
                  accessible={true}
                  accessibilityLabel="go to company website"
                  // accessibilityHint={this.state.userData.website}
                >
                  <Text
                    style={{
                      marginRight: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="web"
                      size={22}
                      color="#CD8930"
                    />
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(this.state.userData.website);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#CD8930",
                      }}
                    >
                      Website Link
                    </Text>
                  </TouchableOpacity>
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
