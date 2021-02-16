import React, { Component, Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Button, Input } from "galio-framework";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withTheme } from "react-native-paper";
import { Icon } from "react-native-elements";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailErr: "",
    passErr: "",
    userData: {},
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
            <Text style={styles.labelStyle}>Student Email</Text>
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
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  {emailError}
                </Text>
                <Icon name="x-octagon" type="feather" color="#F44336" />
              </View>
            ) : (
              <Text></Text>
            )}
            <Text style={styles.labelPassword}>Password</Text>

            <Input
              placeholder=""
              style={styles.input}
              color="white"
              password
              viewPass
              iconColor="white"
              iconSize={22}
              iconStyle={{ marginBottom: 50 }}
              onChangeText={value => this.setState({ password: value })}
            />
            {this.state.passErr != "" ? (
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
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  {passError}
                </Text>
                <Icon name="x-octagon" type="feather" color="#F44336" />
              </View>
            ) : (
              <Text></Text>
            )}
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginTop: 20,
              }}
              onPress={() => navigation.navigate("Forget-password")}
            >
              Forget Password
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
                onPress={() => navigation.navigate("Register")}
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
              Trems and conditions
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
    width: 300,
  },
  labelStyle: {
    color: "white",
    fontSize: 20,
    marginBottom: -14,
  },
  input: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    height: 35,
    alignItems: "center",
  },
  labelPassword: {
    color: "white",
    fontSize: 20,
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
