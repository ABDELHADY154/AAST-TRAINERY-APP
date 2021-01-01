import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "galio-framework";
import { Item, Picker } from "native-base";
import { Icon } from "react-native-elements";
import { axios } from "../../Config/Axios";

export default class RegisterForm extends Component {
  state = {
    opacity: 0.7,
    departments: [],
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
  componentDidMount() {
    axios
      .get("departments")
      .then(response => {
        this.setState({ departments: response.data.response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;

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
          <View style={{ width: 350, marginTop: 10 }}>
            <Text style={styles.labelStyle}>Student Name</Text>
            <Input
              placeholder="regular"
              style={styles.input}
              style={{ opacity: this.state.opacity }}
              color="black"
              type="default"
              onFocus={() => this.onFocus()}
            />
            <Text style={styles.labelStyle}>Student Email</Text>
            <Input
              placeholder="regular"
              style={styles.input}
              style={{ opacity: this.state.opacity }}
              color="black"
              type="email-address"
              onFocus={() => this.onFocus()}
            />
            <Text style={styles.labelStyle}>Password</Text>
            <Input
              placeholder="password"
              style={styles.input}
              color="black"
              onFocus={() => this.onFocus()}
              style={{ opacity: this.state.opacity }}
              password
              viewPass
            />
            <Text style={styles.labelStyle}>Registeration Number</Text>
            <Input
              placeholder="regular"
              style={styles.input}
              style={{ opacity: this.state.opacity }}
              color="black"
              type="numeric"
              onFocus={() => this.onFocus()}
            />
            <Text style={styles.labelStyle}>Registeration Number</Text>
            <Input
              placeholder="regular"
              style={styles.input}
              style={{ opacity: this.state.opacity }}
              color="black"
              type="numeric"
              onFocus={() => this.onFocus()}
            />
            <View>
              <Text style={styles.labelStyle}>Department</Text>
              <Item picker style={styles.boxContainer}>
                <Picker
                  // mode="dropdown"
                  iosIcon={<Icon name="fas fa-chevron-down" color="#1E4275" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#1E4275" }}
                  placeholderIconColor="#1E4275"
                  //   selectedValue={this.state.selected}
                  //   onValueChange={this.onValueChange2.bind(this)}
                >
                  {this.state.departments.map(key => {
                    return (
                      <Picker.Item
                        label={key.dep_name}
                        value={key.id}
                        key={key.id}
                      />
                    );
                  })}
                </Picker>
              </Item>
            </View>
            <Button
              style={styles.button}
              onPress={() => {
                this.props.userSignUp();
              }}
              color="white"
            >
              <Text style={{ color: "#1E4275", fontSize: 18 }}>Sign Up</Text>
            </Button>

            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Already have an account?{" "}
              <Text
                style={{ color: "#CD8930", textDecorationLine: "underline" }}
                onPress={() => navigation.navigate("SignIn")}
              >
                Sign In
              </Text>
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
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },

  logoContainer: {
    marginTop: 50,
  },
  logo: {
    width: 220,
    height: 90,
  },
  labelStyle: {
    fontFamily: "SF-L",
    color: "white",
    fontSize: 18,
    marginBottom: -13,
  },
  input: {
    borderRadius: 10,
    color: "black",
  },
  button: {
    width: "auto",
    borderRadius: 10,
    marginTop: 20,
  },
  boxContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "auto",
    opacity: 0.7,
    marginTop: 10,
  },
});
