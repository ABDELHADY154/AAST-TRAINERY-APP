import React, { Component, Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "galio-framework";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { withTheme } from "react-native-paper";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailErr: "",
    userData: {},
  };

  onBlur() {
    input.current.blur();
    this.setState({
      opacity: 0.7,
    });
  }
  async storeUser(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async storeToken(token) {
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  submit = () => {
    var body = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", body)
      .then(response => {
        this.setState({
          userData: response.data.response.data,
        });
        this.storeUser(this.state.userData);
        this.storeToken(this.state.userData.token);
        this.props.userLogin(this.state.email, this.state.password);
      })
      .catch(error => {
        this.setState({
          emailErr: error.response.data.errors.email,
        });
      });
  };

  render() {
    const { navigation } = this.props;
    var error = this.state.emailErr;
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
              source={require("../../assets/Images/logoWhite.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
              {error}
            </Text>
            <Text style={styles.labelStyle}>Student Email</Text>
            <Input
              placeholder=""
              style={styles.input}
              color="white"
              type="email-address"
              onChangeText={value => this.setState({ email: value })}
            />
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
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginTop: 20,
              }}
              onPress={() => {
                alert("la eftkr enta");
              }}
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
              // flexWrap: "wrap",
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
              Don't have an account?{" "}
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
              onPress={() => navigation.navigate("Register")}
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
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 90,
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
    borderBottomWidth: 2,
    borderRadius: 0,
    height: 40,
    alignItems: "center",
  },
  labelPassword: {
    color: "white",
    fontSize: 20,
    marginBottom: -16,
    marginTop: 20,
  },
  button: {
    width: "auto",
    borderRadius: 10,
    marginTop: 20,
  },
});
export default withTheme(LoginForm);
