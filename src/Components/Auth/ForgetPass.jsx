import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Button } from "galio-framework";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withTheme } from "react-native-paper";
import { Icon, Input } from "react-native-elements";
import { Modal, Portal } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
class ForgetPass extends Component {
  state = {
    email: "",
    emailErr: "",
    message: "",
    visible: false,
  };
  submit = () => {
    this.setState({
      emailErr: "",
    });
    var body = {
      email: this.state.email,
    };

    axios
      .post("/forgot", body)
      .then(response => {
        this.setState({
          emailErr: "",
          message: response.data.response.data.message,
        });

        this.showModal();
      })

      .catch(error => {
        console.log(error.response.data.errors.message);
        if (error.response.data.errors.message) {
          this.setState({
            emailErr: error.response.data.errors.message,
          });
        }
        if (error.response.data.errors.email[0]) {
          this.setState({
            emailErr: error.response.data.errors.email[0],
          });
        }
      });
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
    this.props.navigation.navigate("SignIn");
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Images/signInbg.png")}
          style={styles.image}
        >
          <View style={styles.logoContainer}>
            <Feather
              name="chevron-left"
              size={36}
              color="#fff"
              style={{
                marginRight: 330,
                flex: 1,
                alignSelf: "flex-start",
                marginTop: 5,
              }}
              onPress={() => navigation.push("SignIn")}
            />
            <Image
              source={require("../../assets/Images/IconWhite.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              textAlign="left"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderColor: "white",
                borderBottomWidth: 2,
              }}
              label="Student Email"
              labelStyle={styles.labelStyle}
              onChangeText={value => this.setState({ email: value })}
            />
            {this.state.emailErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: -10,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.emailErr}
                </Text>
                <Icon name="x-octagon" type="feather" color="#F44336" />
              </View>
            ) : (
              <Text></Text>
            )}
            {/* <Text style={styles.labelStyle}>Student Email</Text>
            <Input
              placeholder=""
              style={styles.input}
              color="white"
              type="email-address"
              onChangeText={value => this.setState({ email: value })}
            />
            {this.state.emailErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.emailErr}
                </Text>
                <Icon name="x-octagon" type="feather" color="#F44336" />
              </View>
            ) : (
              <Text></Text>
            )} */}
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
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#1E4274",
                  }}
                >
                  Notice
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#1E4274",
                    marginTop: 20,
                  }}
                >
                  {this.state.message}
                </Text>
              </Modal>
            </Portal>
            <Button style={styles.button} color="white" onPress={this.submit}>
              <Text style={{ color: "#1E4275", fontSize: 18 }}>
                Reset Password
              </Text>
            </Button>
          </View>
        </ImageBackground>
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  logo: {
    width: 100.5,
    height: 130,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  logoContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
    marginTop: 50,
  },
  inputContainer: {
    width: 297,
    marginTop: -60,
  },
  labelStyle: {
    color: "white",
    fontSize: 22,
    fontFamily: "SF-L",
    fontWeight: "normal",
    marginBottom: -10,
  },
  input: {
    backgroundColor: "transparent",
    height: 35,
    alignSelf: "center",
  },
  // inputContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   width: 297,
  // },
  // labelStyle: {
  //   color: "white",
  //   fontSize: 22,
  //   fontFamily: "SF-L",
  //   fontWeight: "normal",
  //   marginBottom: -10,
  // },
  // input: {
  //   backgroundColor: "transparent",
  //   height: 35,
  //   alignSelf: "center",
  // },
  button: {
    width: "auto",
    borderRadius: 10,
    marginTop: 20,
  },
});
export default withTheme(ForgetPass);
