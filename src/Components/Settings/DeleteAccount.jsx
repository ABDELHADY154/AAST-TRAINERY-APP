import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { Button } from "galio-framework";
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { axios } from "../../Config/Axios";

export default class DeleteAccount extends Component {
  state = {
    password: null,
    confirmPassword: null,
    passwordErr: "",
    spinner: false,
    newPasswordText: true,
    confirmPasswordText: true,
  };

  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var data = {
      password: this.state.password,
      password_confirmation: this.state.confirmPassword,
    };
    await axios
      .post("/A/student/deleteAccount", data)
      .then(res => {
        // console.log(res.data);
        this.setState({
          spinner: false,
          passwordErr: "",
        });
        this.props.logout();
      })
      .catch(err => {
        console.log(err.response.data.errors);
        this.setState({
          spinner: false,
        });
        if (err.response.data.errors) {
          this.setState({
            spinner: false,
            passwordErr: err.response.data.errors.password
              ? err.response.data.errors.password
              : err.response.data.errors,
          });
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
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

        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: "5.4%",
            color: "#CD8930",
            fontSize: 24,
            fontFamily: "SF-M",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Delete Account
        </Text>
        <ScrollView>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <Input
              style={{
                backgroundColor: "transparent",
                height: 35,
                marginLeft: "1%",
              }}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                marginLeft: "-2%",
                borderBottomWidth: 2,
                width: "105%",
              }}
              label="Password"
              errorMessage={this.state.passwordErr}
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
                marginLeft: "-2%",
              }}
              secureTextEntry={this.state.newPasswordText}
              rightIcon={() =>
                this.state.newPasswordText == true ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ newPasswordText: false });
                    }}
                  />
                ) : (
                  <Ionicons
                    name="eye-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ newPasswordText: true });
                    }}
                  />
                )
              }
              value={this.state.password}
              onChangeText={value => this.setState({ password: value })}
            />
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "-7%",
                marginLeft: "3%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
            >
              {/* {this.state.studentNameErr ? this.state.studentNameErr : null} */}
            </Text>

            <Input
              style={{
                backgroundColor: "transparent",
                height: 35,
                marginLeft: "1%",
              }}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                marginLeft: "-2%",
                borderBottomWidth: 2,
                width: "105%",
              }}
              label="Confirm Password"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
                marginLeft: "-2%",
              }}
              secureTextEntry={this.state.confirmPasswordText}
              rightIcon={() =>
                this.state.confirmPasswordText == true ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ confirmPasswordText: false });
                    }}
                  />
                ) : (
                  <Ionicons
                    name="eye-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ confirmPasswordText: true });
                    }}
                  />
                )
              }
              value={this.state.confirmPassword}
              onChangeText={value => this.setState({ confirmPassword: value })}
            />
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "-7%",
                marginLeft: "3%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
            >
              {/* {this.state.studentNameErr ? this.state.studentNameErr : null} */}
            </Text>
            <Button
              style={{
                border: 2,
                borderColor: "#F44336",
                borderWidth: 1,
                width: "auto",
                borderRadius: 50,
                marginTop: 20,
                backgroundColor: "#fff",
              }}
              color="#1E4275"
              onPress={this.handleSubmit}
            >
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 18,
                }}
              >
                Delete
              </Text>
            </Button>
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
    // alignItems: "center",
    backgroundColor: "#fff",
  },
});
