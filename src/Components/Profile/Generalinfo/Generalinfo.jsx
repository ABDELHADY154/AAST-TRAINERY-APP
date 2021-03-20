import React, { Component } from "react";
// import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import Spinner from "react-native-loading-spinner-overlay";

export default function GeneralInfoFormScreen(props) {
  const navigation = useNavigation();
  return <GeneralInfo navigation={navigation} {...props} />;
}
class GeneralInfo extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      dateErr: "",
      spinner: true,
      mode: "date",
      show: false,
      countriesList: {},
      citiesList: {},
      country: "",
      countryErr: "",

      city: "",
      cityErr: "",

      studentName: "",
      studentNameErr: "",
      gender: "",
      genderErr: "",

      checked: "",
      nationality: "",
      nationalityErr: "",

      phoneNumber: "",
      phoneNumberErr: "",

      code: null,
      isDatePickerVisible: false,
    };
  }
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleConfirm = date => {
    this.setState({ date: date.toISOString().split("T")[0] });
    this.hideDatePicker();
  };
  countryOnchangeHandler = (itemValue, index) => {
    for (const key in this.state.countriesList) {
      if (this.state.countriesList[key] == itemValue) {
        this.getCityList(key);
        this.setState({ code: key });
        this.setState({ country: itemValue });
        break;
      }
    }
  };

  getCityList = code => {
    axios
      .get(`/stateList/${code}`)
      .then(res => {
        this.setState({ citiesList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
    const data = {
      name: this.state.studentName,
      phone_number: this.state.phoneNumber,
      city: this.state.city,
      gender: this.state.gender,
      country: this.state.country,
      nationality: this.state.nationality,
      date_of_birth: this.state.date,
    };
    await axios
      .put("/A/student/profile/personal", data)
      .then(res => {
        this.setState({
          spinner: false,
        });
        this.props.navigation.push("App", { screen: "Profile" });
      })
      .catch(error => {
        console.log(error.response.data);
        this.setState({
          spinner: false,
        });
        if (error.response.data) {
          if (error.response.data.errors) {
            this.setState({
              phoneNumberErr: error.response.data.errors.phone_number,
              nationalityErr: error.response.data.errors.nationality,
              studentNameErr: error.response.data.errors.name,
            });
          }
        }
      });
  };
  componentDidMount() {
    axios
      .get("/countriesList")
      .then(res => {
        this.setState({ countriesList: res.data });
        if (this.state.country !== "") {
          this.countryOnchangeHandler(this.state.country);
        }
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get("/A/student/profile/personal")
      .then(res => {
        this.setState({
          studentName: res.data.response.data.fullName,
          gender: res.data.response.data.gender,
          date: res.data.response.data.dob,
          nationality: res.data.response.data.nationality,
          country: res.data.response.data.country,
          city: res.data.response.data.city,
          phoneNumber: res.data.response.data.phoneNumber,
          checked: res.data.response.data.gender == "male" ? "first" : "second",
          spinner: false,
        });
      })

      .catch(err => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          // textContent={"Uploading..."}
          cancelable={false}
          size="large"
          color="#1E4274"
          animation="fade"
          overlayColor="rgba(255, 255, 255, 0.8)"
          textStyle={{ color: "#1E4274", textAlign: "center" }}
        />
        <Feather
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
        <Text style={styles.title}>Personal Information</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <Input
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
              label="Full Name"
              labelStyle={styles.labelStyle}
              value={this.state.studentName}
              onChangeText={value => this.setState({ studentName: value })}
            />
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "-7%",
                marginLeft: "3%",
                marginBottom: "2%",
                textTransform: 'capitalize'
              }}
            >
              {this.state.studentNameErr ? this.state.studentNameErr : null}
            </Text>
            <Text
              style={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: 5,
                marginLeft: "1%",
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: "-1%",
              }}
            >
              <RadioButton
                value="male"
                uncheckedColor="#1E4274"
                status={
                  this.state.checked === "first" ? "checked" : "unchecked"
                }
                color="#1E4274"
                onPress={() =>
                  this.setState({ checked: "first", gender: "male" })
                }
              />
              <Text
                style={{
                  marginLeft: "1%",
                  color: "#1E4274",
                  marginRight: "10%",
                  marginTop: 8,
                }}
              >
                Male
              </Text>
              <RadioButton
                value="female"
                uncheckedColor="#1E4274"
                color="#1E4274"
                status={
                  this.state.checked === "second" ? "checked" : "unchecked"
                }
                onPress={() =>
                  this.setState({ checked: "second", gender: "female" })
                }
              />
              <Text
                style={{
                  color: "#1E4274",
                  marginTop: 8,
                }}
              >
                Female
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 15,
                  marginBottom: -20,
                  marginLeft: "-4%",
                }}
              >
                Date Of Birth
              </Text>
              <View>
                <View>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />

                  <Feather
                    name="calendar"
                    size={22}
                    color="#1E4274"
                    style={{
                      marginTop: 20,
                      alignSelf: "flex-end",
                    }}
                  ></Feather>

                  <Button
                    onPress={this.showDatePicker}
                    color="transparent"
                    style={{
                      width: "110%",
                      marginLeft: -15,
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
                      borderRadius: 0,
                      marginTop: -30,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1E4274",
                        textAlign: "center",
                      }}
                    >
                      {this.state.date}
                    </Text>
                  </Button>
                </View>
              </View>
              <Input
                style={{
                  backgroundColor: "transparent",
                  height: 35,
                  marginLeft: "2%",
                }}
                textContentType="name"
                keyboardType="default"
                textAlign="left"
                inputStyle={{ color: "#1E4274" }}
                inputContainerStyle={{
                  borderColor: "#1E4274",
                  borderBottomWidth: 2,
                  marginLeft: "-9%",
                  width: "118%",
                }}
                value={this.state.nationality}
                label="Nationality"
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -10,
                  marginTop: 15,
                  marginLeft: -25,
                }}
                onChangeText={value => this.setState({ nationality: value })}
              />
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-7%",
                  marginLeft: "-5%",
                  marginBottom: "2%",
                  textTransform: 'capitalize'
                }}
              >
                {this.state.nationalityErr ? this.state.nationalityErr : null}
              </Text>

              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 0,
                  marginLeft: "-4.9%",
                }}
              >
                Country
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "118%",
                  marginLeft: "-13%",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                }}
              >
                <Picker
                  mode="dialog"
                  style={{
                    color: "#1E4275",
                    marginLeft: "5%",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 10,
                    borderRadius: 0,
                  }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#1E4275" }}
                  placeholderIconColor="#1E4275"
                  itemStyle={{ backgroundColor: "#fff" }}
                  dropdownIconColor="#1E4275"
                  selectedValue={this.state.country}
                  onValueChange={this.countryOnchangeHandler}
                >
                  <Picker.Item label="Choose Your Country" value="0" />
                  {Object.entries(this.state.countriesList).map(([el, val]) => {
                    return <Picker.Item label={val} value={val} key={el} />;
                  })}
                </Picker>
              </View>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 15,
                  marginLeft: "-4.9%",
                }}
              >
                City
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "118%",
                  marginLeft: "-13%",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                }}
              >
                <Picker
                  mode="dialog"
                  style={{
                    color: "#1E4275",
                    marginLeft: "5%",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 10,
                    borderRadius: 0,
                  }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#1E4275" }}
                  placeholderIconColor="#1E4275"
                  itemStyle={{ backgroundColor: "#fff" }}
                  dropdownIconColor="#1E4275"
                  selectedValue={this.state.city}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ city: itemValue });
                  }}
                >
                  <Picker.Item label="Choose Your City" value="0" />

                  {Object.entries(this.state.citiesList).map(([el, val]) => {
                    return <Picker.Item label={val} value={val} key={el} />;
                  })}
                </Picker>
              </View>
              <Input
                style={styles.input}
                keyboardType="numeric"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                  marginLeft: "-16%",
                  width: "125%",
                }}
                label="Phone Number"
                textContentType="telephoneNumber"
                value={this.state.phoneNumber}
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -5,
                  marginTop: 15,
                  marginLeft: "-8%",
                }}
                onChangeText={value => this.setState({ phoneNumber: value })}
              />
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-7%",
                  marginLeft: "-6%",
                  marginBottom: "2%",
                  textTransform: 'capitalize'
                }}
              >
                {this.state.phoneNumberErr ? this.state.phoneNumberErr : null}
              </Text>
            </View>
            <Button
              style={styles.button}
              color="#1E4275"
              onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
            </Button>
          </ScrollView>
          <StatusBar style="dark" animated={true} showHideTransition="slide" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "5.4%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "91%",
    alignSelf: "center",
  },
  labelStyle: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginBottom: -10,
    marginTop: 15,
    marginLeft: "-2%",
  },
  input: {
    backgroundColor: "transparent",
    height: 35,
    marginLeft: "6%",
  },
  gender: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginTop: 15,
  },
  boxContainer: {
    backgroundColor: "transparent",
    width: "107%",
    alignSelf: "flex-start",
    borderColor: "#1E4275",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    alignSelf: "flex-start",
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
