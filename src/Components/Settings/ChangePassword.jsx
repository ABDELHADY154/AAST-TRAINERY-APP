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

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { axios } from "../../Config/Axios";
import Spinner from "react-native-loading-spinner-overlay";
import { Modal, Portal } from "react-native-paper";

export default class ChangePassword extends Component {
  state = {
    oldPasswordText: true,
    newPasswordText: true,
    confirmPasswordText: true,
    oldpassword: null,
    newPassword: null,
    confirmPassword: null,
    oldError: "",
    passwordError: "",
    spinner: false,
    visible: false,
  };

  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var data = {
      old_password: this.state.oldpassword,
      password: this.state.newPassword,
      password_confirmation: this.state.confirmPassword,
    };
    await axios
      .put("/A/student/updatePassword", data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          spinner: false,
          visible: true,
        });
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            spinner: false,
          });
          if (
            err.response.data.errors.old_password ||
            err.response.data.errors.password
          ) {
            this.setState({
              oldError: err.response.data.errors.old_password,
              passwordError: err.response.data.errors.password,
            });
          } else {
            this.setState({
              oldError: err.response.data.errors,
              passwordError: "",
            });
          }
        }
      });
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
    this.props.navigation.navigate("Settings");
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
          accessible={true}
          accessibilityLabel="go back"
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
          Change Password
        </Text>
        <ScrollView>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <Input
              accessible={true}
              accessibilityLabel="enter your old password"
              style={{
                backgroundColor: "transparent",
                height: 35,
                marginLeft: "1%",
              }}
              errorMessage={this.state.oldError}
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
              label="Old Password"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
                marginLeft: "-2%",
              }}
              secureTextEntry={this.state.oldPasswordText}
              rightIcon={() =>
                this.state.oldPasswordText == true ? (
                  <Ionicons
                    accessible={true}
                    accessibilityLabel="show or hide password"
                    name="eye-off-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ oldPasswordText: false });
                    }}
                  />
                ) : (
                  <Ionicons
                    accessible={true}
                    accessibilityLabel="show or hide password"
                    name="eye-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ oldPasswordText: true });
                    }}
                  />
                )
              }
              value={this.state.oldpassword}
              onChangeText={(value) => this.setState({ oldpassword: value })}
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
              accessible={true}
              accessibilityLabel="enter your new password"
              style={{
                backgroundColor: "transparent",
                height: 35,
                marginLeft: "1%",
              }}
              autoCompleteType="name"
              textContentType="name"
              errorMessage={this.state.passwordError}
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                marginLeft: "-2%",
                borderBottomWidth: 2,
                width: "105%",
              }}
              label="New Password"
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
                    accessible={true}
                    accessibilityLabel="show or hide password"
                    name="eye-off-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ newPasswordText: false });
                    }}
                  />
                ) : (
                  <Ionicons
                    accessible={true}
                    accessibilityLabel="show or hide password"
                    name="eye-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ newPasswordText: true });
                    }}
                  />
                )
              }
              value={this.state.newPassword}
              onChangeText={(value) => this.setState({ newPassword: value })}
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
              accessible={true}
              accessibilityLabel="confirm your new password"
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
                    accessible={true}
                    accessibilityLabel="show or hide password"
                    name="eye-off-outline"
                    size={24}
                    color="#1E4274"
                    onPress={() => {
                      this.setState({ confirmPasswordText: false });
                    }}
                  />
                ) : (
                  <Ionicons
                    accessible={true}
                    accessibilityLabel="show or hide password"
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
              onChangeText={(value) =>
                this.setState({ confirmPassword: value })
              }
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
              style={{ width: "auto", borderRadius: 50, marginTop: 40 }}
              color="#1E4275"
              onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
            </Button>
            <Portal>
              <Modal
                visible={this.state.visible}
                onDismiss={this.hideModal}
                contentContainerStyle={{
                  backgroundColor: "white",
                  padding: 20,
                  width: 294,
                  height: 178,
                  alignSelf: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#1E4274",
                    // marginTop: 20,
                    fontSize: 25,
                  }}
                >
                  Password changed successfully
                </Text>
              </Modal>
            </Portal>
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
