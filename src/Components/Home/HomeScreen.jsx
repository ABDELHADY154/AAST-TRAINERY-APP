import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { axios } from "../../Config/Axios";

export default class HomeScreen extends Component {
  state = {
    userData: {},
    token: "",
  };

  async componentDidMount() {
    try {
      var config = await AsyncStorage.getItem("config");
      var parsedConfig = JSON.parse(config);
    } catch (e) {
      console.log(e);
    }
    axios
      .get("/A/get-profile", parsedConfig)
      .then(response => {
        this.setState({
          userData: response.data.response.data,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Welcome {this.state.userData.email}</Text>
        <Button
          onPress={() => {
            AsyncStorage.removeItem("userData");
            AsyncStorage.removeItem("userToken");
            AsyncStorage.removeItem("config");
            this.props.userSignOut();
          }}
        >
          <Text>Logout</Text>
        </Button>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: 40,
  },
});
