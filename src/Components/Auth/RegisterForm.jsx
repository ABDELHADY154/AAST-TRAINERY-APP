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
import { Button } from "galio-framework";
import { Picker } from "@react-native-picker/picker";
import { axios } from "../../Config/Axios";
import { withTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Input } from "react-native-elements";
import { Radio } from "galio-framework";
import { RadioButton } from "react-native-paper";
import { Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Modal, Portal } from "react-native-paper";

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
    showPass: true,
    showConfPass: true,
    modalRef: Modalize,
    visible: false,
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

  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
    // this.props.navigation.navigate("SignIn");
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}> */}
        <ImageBackground
          source={require("../../assets/Images/signInbg.png")}
          style={styles.image}
        >
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/Images/IconWhite.png")}
                style={styles.logo}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                accessible={true}
                accessibilityLabel="enter your name"
                style={styles.input}
                autoCompleteType="name"
                textContentType="name"
                keyboardType="default"
                textAlign="left"
                inputStyle={{ color: "white" }}
                inputContainerStyle={{
                  borderColor: "white",
                  borderBottomWidth: 2,
                }}
                label="Student Name"
                labelStyle={styles.labelStyle}
                onChangeText={value => this.setState({ studentName: value })}
              />
              {this.state.studentNameErr != "" ? (
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
                    {this.state.studentNameErr}
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
              <Input
                accessible={true}
                accessibilityLabel="enter your email"
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
                onChangeText={value => this.setState({ studentEmail: value })}
              />
              {this.state.studentEmailErr != "" ? (
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
                    {this.state.studentEmailErr}
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
              <Input
                accessible={true}
                accessibilityLabel="enter your password"
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
                      accessible={true}
                      accessibilityLabel="show or hide password"
                      name="eye-off-outline"
                      type="ionicon"
                      color="#ffffff"
                      onPress={() => {
                        this.setState({ showPass: true });
                      }}
                    />
                  ) : (
                    <Icon
                      accessible={true}
                      accessibilityLabel="show or hide password"
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
                onChangeText={value => this.setState({ studentPass: value })}
              />
              {this.state.studentPassErr != "" ? (
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
                      // width: 250,
                    }}
                  >
                    {this.state.studentPassErr}
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
              <Input
                accessible={true}
                accessibilityLabel="confirm your password"
                style={styles.input}
                textContentType="password"
                autoCompleteType="password"
                keyboardType="default"
                textAlign="left"
                label="Confirm Password"
                inputStyle={{ color: "white", marginBottom: -10 }}
                inputContainerStyle={{
                  borderColor: "white",
                  borderBottomWidth: 2,
                }}
                rightIcon={
                  this.state.showConfPass == false ? (
                    <Icon
                      accessible={true}
                      accessibilityLabel="show or hide password"
                      name="eye-off-outline"
                      type="ionicon"
                      color="#ffffff"
                      onPress={() => {
                        this.setState({ showConfPass: true });
                      }}
                    />
                  ) : (
                    <Icon
                      accessible={true}
                      accessibilityLabel="show or hide password"
                      name="eye-outline"
                      type="ionicon"
                      color="#ffffff"
                      onPress={() => {
                        this.setState({ showConfPass: false });
                      }}
                    />
                  )
                }
                labelStyle={styles.labelPassword}
                secureTextEntry={this.state.showConfPass}
                onChangeText={value => this.setState({ studentConPass: value })}
              />
              <Input
                accessible={true}
                accessibilityLabel="enter your Registration Number"
                style={styles.input}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "white" }}
                inputContainerStyle={{
                  borderColor: "white",
                  borderBottomWidth: 2,
                }}
                label="Registration Number"
                labelStyle={styles.labelStyle}
                onChangeText={value => this.setState({ regNo: value })}
              />
              {this.state.regNoErr != "" ? (
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
                    {this.state.regNoErr}
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
                  fontSize: 22,
                  fontFamily: "SF-L",
                  fontWeight: "normal",
                  marginBottom: -10,
                  marginLeft: 10,
                }}
              >
                Department Major
              </Text>
              {Platform.OS == "android" ? (
                <View
                  accessible={true}
                  accessibilityLabel="choose your Major Department "
                  style={styles.boxContainer}
                >
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
                    <Picker.Item
                      label="choose your Major Department"
                      value="0"
                    />
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
              ) : (
                <View
                  accessible={true}
                  accessibilityLabel="choose your Major Department "
                  style={styles.boxContainer}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "left",
                      paddingTop: "10%",
                      paddingBottom: "5%",
                    }}
                    onPress={this.showModal}
                  >
                    {this.state.department == ""
                      ? "choose your Major Department"
                      : this.state.departments.map(i => {
                          if (i.id == this.state.department) {
                            return i.dep_name;
                          }
                        })}
                  </Text>
                </View>
              )}

              {this.state.departmentErr != "" ? (
                <View
                  style={{
                    justifyContent: "space-between",
                    alignSelf: "center",
                    flexDirection: "row",
                    width: "91.5%",
                    marginTop: 10,
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
                accessible={true}
                accessibilityLabel="choose your Gender"
                style={{
                  color: "white",
                  fontSize: 22,
                  fontFamily: "SF-L",
                  fontWeight: "normal",
                  marginBottom: -10,
                  marginLeft: "3.3%",
                }}
              >
                Gender
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "10%",
                }}
              >
                <RadioButton.Android
                  accessible={true}
                  accessibilityLabel="male"
                  value="male"
                  uncheckedColor="white"
                  status={
                    this.state.checked === "first" ? "checked" : "unchecked"
                  }
                  color="white"
                  onPress={() =>
                    this.setState({ checked: "first", gender: "male" })
                  }
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
                <RadioButton.Android
                  accessible={true}
                  accessibilityLabel="female"
                  value="female"
                  uncheckedColor="white"
                  color="white"
                  status={
                    this.state.checked === "second" ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    this.setState({ checked: "second", gender: "female" })
                  }
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
                    alignSelf: "center",
                    flexDirection: "row",
                    width: "91.5%",
                    marginTop: 10,
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
              <Button style={styles.button} color="white" onPress={this.submit}>
                <Text style={{ color: "#1E4275", fontSize: 18 }}>Sign Up</Text>
              </Button>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                accessible={true}
                accessibilityLabel="Already have an account"
                accessibilityHint="Signin"
                accessibilityRole="button"
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                    marginBottom: 3,
                  }}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  Already have an account?{" "}
                  <Text
                    style={{
                      color: "#CD8930",
                    }}
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
              <View
                accessible={true}
                accessibilityLabel="By continuing you agree to our Terms and conditions"
                accessibilityHint="Will navigate to trainery website"
                accessibilityRole="button"
              >
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
                  onPress={() => {
                    Linking.openURL(
                      "http://aast-trainery.com/TermsandConditions",
                    );
                  }}
                >
                  Terms and conditions
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <Portal>
          <Modal
            visible={this.state.visible}
            onDismiss={this.hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              width: "90%",
              // height: 178,
              alignSelf: "center",
              justifyContent: "flex-start",
              borderRadius: 15,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Button
                onlyIcon
                icon="close"
                iconFamily="antdesign"
                iconSize={30}
                color="#f5f5f5"
                iconColor="#1E4274"
                style={{ width: 40, height: 40 }}
                onPress={this.hideModal}
              >
                warning
              </Button>
            </View>

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
                // height: 30,
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
              <Picker.Item label="choose your Major Department" value="0" />
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
          </Modal>
        </Portal>
        <StatusBar style="light" />
        {/* </SafeAreaView> */}
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
  boxContainer: {
    backgroundColor: "transparent",
    width: 282,
    // marginTop: 10,
    borderColor: "white",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    // marginBottom: 10,
    alignSelf: "center",
  },
  iosboxContainer: {
    backgroundColor: "transparent",
    width: 282,
    // marginTop: 10,
    borderColor: "white",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    // marginBottom: 10,
    alignSelf: "center",
  },
});
export default withTheme(RegisterForm);
