import React, { Component, Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Button } from "galio-framework";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withTheme } from "react-native-paper";
import { Icon, Input } from "react-native-elements";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailErr: "",
    passErr: "",
    userData: {},
    showPass: true,
  };

  async storeConfig(config) {
    try {
      const jsonValue = JSON.stringify(config);
      await AsyncStorage.setItem("config", jsonValue);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async storeToken(token) {
    try {
      await AsyncStorage.setItem("userToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log(axios);
      console.log(axios.defaults.headers.common);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  submit = () => {
    this.setState({
      emailErr: "",
      passErr: "",
    });
    var body = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", body)
      .then(response => {
        this.setState({
          userData: response.data.response.data,
          emailErr: "",
          passErr: "",
        });
        let config = {
          headers: {
            Authorization: "Bearer " + this.state.userData.token,
          },
        };
        this.storeConfig(config);
        this.storeToken(this.state.userData.token);
        this.props.userLogin(this.state.email, this.state.password);
      })

      .catch(error => {
        if (error.response.data.errors.email) {
          this.setState({
            emailErr: error.response.data.errors.email,
          });
        }
        if (error.response.data.errors.password) {
          this.setState({
            passErr: error.response.data.errors.password,
          });
        }
      });
  };

  render() {
    const { navigation } = this.props;
    var emailError = this.state.emailErr;
    var passError = this.state.passErr;
    const { colors, fonts } = this.props.theme ? this.props.theme : "";

    if (this.state.userData.token) {
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Images/signInbg.png")}
          style={styles.image}
        >
          <View style={styles.logoContainer}>
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
                  {emailError}
                </Text>
                <Icon
                  name="x-octagon"
                  type="feather"
                  color="#F44336"
                  size={18}
                />
              </View>
            ) : (
              <Text></Text>
            )}
            <Input
              style={styles.input}
              textContentType="password"
              autoCompleteType="password"
              keyboardType="default"
              textAlign="left"
              label="Password"
              inputStyle={{ color: "white", marginBottom: -10 }}
              inputContainerStyle={{
                borderColor: "white",
                borderBottomWidth: 2,
              }}
              rightIcon={
                this.state.showPass == false ? (
                  <Icon
                    name="eye-off-outline"
                    type="ionicon"
                    color="#ffffff"
                    onPress={() => {
                      this.setState({ showPass: true });
                    }}
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    type="ionicon"
                    color="#ffffff"
                    onPress={() => {
                      this.setState({ showPass: false });
                    }}
                  />
                )
              }
              labelStyle={styles.labelPassword}
              secureTextEntry={this.state.showPass}
              onChangeText={value => this.setState({ password: value })}
            />
            {this.state.passErr != "" ? (
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
                  {passError}
                </Text>
                <Icon
                  size={18}
                  name="x-octagon"
                  type="feather"
                  color="#F44336"
                />
              </View>
            ) : (
              <Text></Text>
            )}
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginTop: 20,
                marginLeft: 10,
              }}
              onPress={() => navigation.push("Forget-password")}
            >
              Forgot Password
            </Text>
            <Button style={styles.button} color="white" onPress={this.submit}>
              <Text style={{ color: "#1E4275", fontSize: 18 }}>Sign In</Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
                marginBottom: 3,
              }}
            >
              Don't have an account?{"  "}
              <Text
                style={{
                  color: "#CD8930",
                }}
                onPress={() => navigation.push("Register")}
              >
                Sign Up
              </Text>
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              By continuing you agree to our
            </Text>
            <Text
              style={{
                color: "#CD8930",
                fontWeight: "500",
                fontSize: 16,
                textAlign: "center",
              }}
              onPress={() => alert("mafeesh l kalam dah ")}
            >
              Terms and conditions
            </Text>
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
  logo: {
    width: 100.5,
    height: 130,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    width: 297,
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
  labelPassword: {
    color: "white",
    fontSize: 22,
    fontFamily: "SF-L",
    fontWeight: "normal",
    marginBottom: -16,
    marginTop: 0,
  },
  button: {
    width: "auto",
    borderRadius: 10,
    marginTop: 20,
  },
});
export default withTheme(LoginForm);
