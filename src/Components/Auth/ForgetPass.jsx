import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Button, Input } from "galio-framework";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withTheme } from "react-native-paper";
import { Icon } from "react-native-elements";

class ForgetPass extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Images/signInbg.png")}
          style={styles.image}
        >
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/Images/logoWhite.png")} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>Student Email</Text>
            <Input
              placeholder=""
              style={styles.input}
              color="white"
              type="email-address"
              // onChangeText={value => this.setState({ email: value })}
            />
            <Button style={styles.button} color="white">
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
    width: 300,
    marginTop: -60,
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

  button: {
    width: "auto",
    borderRadius: 10,
    marginTop: 20,
  },
});
export default withTheme(ForgetPass);
