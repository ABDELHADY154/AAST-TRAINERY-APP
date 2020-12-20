import React, { Component, Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "galio-framework";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class LoginForm extends Component {
  state = {
    opacity: 0.7,
    email: "",
    password: "",
    emailErr: "",
    userData: {},
  };
  onFocus() {
    this.setState({
      opacity: 1,
    });
  }
  onBlur() {
    input.current.blur();
    this.setState({
      opacity: 0.7,
    });
  }
  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
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
        this.storeToken(this.state.userData);
        this.props.navigation.navigate("Home");
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

          <View style={{ width: 350, marginTop: 60 }}>
            <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
              {error}
            </Text>

            <Text style={styles.labelStyle}>Student Email</Text>
            <Input
              placeholder="regular"
              style={styles.input}
              style={{ opacity: this.state.opacity }}
              color="black"
              type="email-address"
              onFocus={() => this.onFocus()}
              onChangeText={value => this.setState({ email: value })}
            />
            <Text style={styles.labelStyle}>Password</Text>

            <Input
              placeholder="password"
              style={styles.input}
              color="black"
              style={{ opacity: this.state.opacity }}
              password
              viewPass
              onChangeText={value => this.setState({ password: value })}
            />
            <Button style={styles.button} color="white" onPress={this.submit}>
              <Text style={{ color: "#1E4275", fontSize: 18 }}>Sign In</Text>
            </Button>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Create a new Account?{" "}
              <Text
                style={{
                  color: "#CD8930",
                  textDecorationLine: "underline",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ImageBackground>
        <StatusBar style="light" />
      </View>
    );
  }
}
export default function (props) {
  const navigation = useNavigation();

  return <LoginForm {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },

  logoContainer: {
    marginTop: 100,
  },
  logo: {
    width: 220,
    height: 90,
  },
  labelStyle: {
    fontFamily: "SF-L",
    color: "white",
    fontSize: 20,
    marginTop: 15,
  },
  input: {
    borderRadius: 10,
    color: "black",
  },
  button: {
    width: "auto",
    borderRadius: 10,
    marginTop: 40,
  },
});
