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
import Spinner from "react-native-loading-spinner-overlay";
import { axios } from "../../Config/Axios";
import { Modal, Portal } from "react-native-paper";

export default class UpdateEmail extends Component {
  state = {
    spinner: false,
    emailErr: "",
    email: "",
    visible: false,
  };

  async componentDidMount() {
    this.setState({
      spinner: true,
    });
    await axios
      .get("/A/student/studentAccount")
      .then((res) => {
        console.log(res.data.response.data.email);
        this.setState({
          spinner: false,
          email: res.data.response.data.email,
        });
      })
      .catch((err) => {});
  }
  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
    this.props.navigation.navigate("Settings");
  };
  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var data = {
      email: this.state.email,
    };
    await axios
      .put("/A/student/updateEmail", data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          spinner: false,
          visible: true,
          emailErr: "",
        });
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            spinner: false,
          });
          if (err.response.data.errors.email) {
            this.setState({
              emailErr: err.response.data.errors.email,
            });
          } else {
            this.setState({
              emailErr: err.response.data.errors,
            });
          }
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
          Update E-mail
        </Text>
        <ScrollView>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <Input
              accessible={true}
              accessibilityLabel="enter your new email"
              accessibilityHint={this.state.email}
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
              errorMessage={this.state.emailErr}
              label="New Mail"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
                marginLeft: "-2%",
              }}
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value })}
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
                  Email updated successfully
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
