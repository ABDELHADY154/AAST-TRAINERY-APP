import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Input, Button } from "galio-framework";
import { Picker } from "@react-native-picker/picker";
import { axios } from "../../Config/Axios";
import { withTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";
import { Radio } from "galio-framework";
import { RadioButton } from "react-native-paper";

class RegisterForm extends Component {
  state = {
    departments: [],
    userData: {},
    studentName: "",
    studentNameErr: "",
    studentEmail: "",
    studentEmailErr: "",
    studentPass: "",
    studentPassErr: "",
    studentConPass: "",
    studentConPassErr: "",
    confPass: "",
    confPassErr: "",
    regNo: "",
    regNoErr: "",
    department: "",
    departmentErr: "",
    gender: "",
    genderErr: "",
    checked: "",
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
      await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } catch (error) {
      console.log("Something went wrong", error);
    }
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

  submit = () => {
    this.setState({
      studentNameErr: "",
      studentEmailErr: "",
      studentPassErr: "",
      confPassErr: "",
      regNoErr: "",
      departmentErr: "",
      genderErr: "",
    });
    var body = {
      name: this.state.studentName,
      email: this.state.studentEmail,
      password: this.state.studentPass,
      password_confirmation: this.state.studentConPass,
      reg_no: this.state.regNo,
      department_id: this.state.department,
      gender: this.state.gender,
    };
    axios
      .post("/register", body)
      .then(response => {
        this.setState({
          userData: response.data.response.data,
        });
        let config = {
          headers: {
            Authorization: "Bearer " + this.state.userData.token,
          },
        };
        this.storeConfig(config);
        this.storeToken(this.state.userData.token);
        this.props.userSignUp(
          this.state.userData.name,
          this.state.userData.email,
        );
      })
      .catch(error => {
        console.log(error.response.data.errors);
        if (error.response.data.errors.name) {
          this.setState({
            studentNameErr: error.response.data.errors.name,
          });
        }
        if (error.response.data.errors.email) {
          this.setState({
            studentEmailErr: error.response.data.errors.email,
          });
        }
        if (error.response.data.errors.password) {
          this.setState({
            studentPassErr: error.response.data.errors.password,
          });
        }
        if (error.response.data.errors.reg_no) {
          this.setState({
            regNoErr: error.response.data.errors.reg_no,
          });
        }
        if (error.response.data.errors.department_id) {
          this.setState({
            departmentErr: error.response.data.errors.department_id[0],
          });
        }
        if (error.response.data.errors.gender) {
          this.setState({
            genderErr: error.response.data.errors.gender,
          });
        }
      });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
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
                <Text style={styles.labelStyle}>Student Name</Text>
                <Input
                  placeholder=""
                  style={styles.input}
                  color="white"
                  onChangeText={value => this.setState({ studentName: value })}
                />
                {this.state.studentNameErr != "" ? (
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
                      {this.state.studentNameErr}
                    </Text>
                    <Icon name="x-octagon" type="feather" color="#F44336" />
                  </View>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.labelStyle}>Student Email</Text>
                <Input
                  placeholder=""
                  style={styles.input}
                  color="white"
                  type="email-address"
                  onChangeText={value => this.setState({ studentEmail: value })}
                />
                {this.state.studentEmailErr != "" ? (
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
                      {this.state.studentEmailErr}
                    </Text>
                    <Icon name="x-octagon" type="feather" color="#F44336" />
                  </View>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.labelStyle}>Password</Text>
                <Input
                  placeholder=""
                  style={styles.input}
                  color="white"
                  password
                  viewPass
                  iconColor="white"
                  iconSize={22}
                  iconStyle={{ marginBottom: 50 }}
                  onChangeText={value => this.setState({ studentPass: value })}
                />
                {this.state.studentPassErr != "" ? (
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
                      {this.state.studentPassErr}
                    </Text>
                    <Icon name="x-octagon" type="feather" color="#F44336" />
                  </View>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.labelStyle}>Confirm Password</Text>
                <Input
                  placeholder=""
                  style={styles.input}
                  color="white"
                  password
                  viewPass
                  iconColor="white"
                  iconSize={22}
                  iconStyle={{ marginBottom: 50 }}
                  onChangeText={value =>
                    this.setState({ studentConPass: value })
                  }
                />
                <Text style={styles.labelStyle}>Registeration Number</Text>
                <Input
                  type="number-pad"
                  placeholder=""
                  style={styles.input}
                  color="white"
                  onChangeText={value => this.setState({ regNo: value })}
                />
                {this.state.regNoErr != "" ? (
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
                      {this.state.regNoErr}
                    </Text>
                    <Icon name="x-octagon" type="feather" color="#F44336" />
                  </View>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.labelStyle}>Department Major</Text>
                <View style={styles.boxContainer}>
                  <Picker
                    mode="dialog"
                    style={{
                      color: "white",
                      borderColor: "white",
                      borderTopWidth: 0,
                      borderRightWidth: 0,
                      borderLeftWidth: 0,
                      borderBottomWidth: 10,
                      borderRadius: 0,
                    }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#1E4275" }}
                    placeholderIconColor="white"
                    itemStyle={{ backgroundColor: "#fff" }}
                    dropdownIconColor="white"
                    selectedValue={this.state.department}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ department: itemValue })
                    }
                  >
                    <Picker.Item label="Not Set" value="0" />
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
                </View>
                {this.state.departmentErr != "" ? (
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
                      {this.state.departmentErr}
                    </Text>
                    <Icon name="x-octagon" type="feather" color="#F44336" />
                  </View>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.labelStyle}>Gender</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: "10%",
                  }}
                >
                  <RadioButton
                    value="male"
                    uncheckedColor="white"
                    status={
                      this.state.checked === "first" ? "checked" : "unchecked"
                    }
                    color="white"
                    onPress={() => this.setState({ checked: "first" })}
                  />
                  <Text
                    style={{
                      color: "white",
                      marginRight: "20%",
                      alignSelf: "center",
                    }}
                  >
                    Male
                  </Text>
                  <RadioButton
                    value="female"
                    uncheckedColor="white"
                    color="white"
                    status={
                      this.state.checked === "second" ? "checked" : "unchecked"
                    }
                    onPress={() => this.setState({ checked: "second" })}
                  />
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                    }}
                  >
                    Female
                  </Text>
                </View>
                {this.state.genderErr != "" ? (
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
                      {this.state.genderErr}
                    </Text>
                    <Icon name="x-octagon" type="feather" color="#F44336" />
                  </View>
                ) : (
                  <Text></Text>
                )}
                <Button
                  style={styles.button}
                  color="white"
                  onPress={this.submit}
                >
                  <Text style={{ color: "#1E4275", fontSize: 18 }}>
                    Sign Up
                  </Text>
                </Button>
              </View>
              <View
                style={{
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
                  Already have an account?{"  "}
                  <Text
                    style={{
                      color: "#CD8930",
                    }}
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    Sign In
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
          </ScrollView>
        </SafeAreaView>
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
  boxContainer: {
    backgroundColor: "transparent",
    width: "auto",
    marginTop: 10,
    borderColor: "white",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
});
export default withTheme(RegisterForm);
