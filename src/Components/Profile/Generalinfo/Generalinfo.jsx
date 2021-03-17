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

export default function GeneralInfoFormScreen(props) {
  const navigation = useNavigation();
  return <GeneralInfo navigation={navigation} {...props} />;
}
class GeneralInfo extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      mode: "date",
      show: false,
      countriesList: {},
      citiesList: {},
      country: "",
      city: "",
      studentName: "",
      gender: "",
      checked: "",
      nationality: "",
      phoneNumber: "",
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
        this.props.navigation.push("App", { screen: "Profile" });
      })
      .catch(err => {
        console.log(err.response);
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
        });
      })

      .catch(err => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "6%",
            // flex: 1,
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Personal Information</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <Input
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Full Name"
              labelStyle={styles.labelStyle}
              value={this.state.studentName}
              onChangeText={value => this.setState({ studentName: value })}
            />
            <Text
              style={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: 5,
                marginLeft: 10,
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <RadioButton
                value="male"
                uncheckedColor="#1E4274"
                status={
                  this.state.checked === "first" ? "checked" : "unchecked"
                }
                color="#1E4274"
                // style={{ borderRadius: 5 }}
                onPress={() =>
                  this.setState({ checked: "first", gender: "male" })
                }
              />
              <Text
                style={{
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
                  marginLeft: -15,
                  marginBottom: -20,
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
                      width: "108%",
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
                      }}
                    >
                      {this.state.date}
                    </Text>
                  </Button>
                </View>
              </View>
              <Input
                style={styles.input}
                textContentType="name"
                keyboardType="default"
                textAlign="left"
                inputStyle={{ color: "#1E4274" }}
                inputContainerStyle={{
                  borderColor: "#1E4274",
                  borderBottomWidth: 2,
                  marginLeft: -25,
                  width: "115%",
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
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 0,
                  marginLeft: -16,
                }}
              >
                Country
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "108%",
                  marginLeft: -17,
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
                  marginLeft: -15,
                }}
              >
                City
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "107.5%",
                  marginLeft: -17,
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
                  marginLeft: -29,
                  width: "116%",
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
                  marginLeft: -27,
                }}
                onChangeText={value => this.setState({ phoneNumber: value })}
              />
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
    width: "97%",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "9%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "87%",
    alignSelf: "center",
  },
  labelStyle: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginBottom: -10,
    marginTop: 15,
  },
  input: {
    backgroundColor: "transparent",
    height: 35,
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
