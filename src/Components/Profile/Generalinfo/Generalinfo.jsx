import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import { CountryPicker } from "react-native-country-picker-modal";
export default class Generalinfo extends Component {
  state = {
    studentName: "",
    gender: "",
    checked: "",
    dateOfBirth: "",
    nationality: "",
    country: "",
    city: "",
    phone_Number: "",
  };
  constructor(props) {
    super(props);
    this.state = { date: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Feather
                name="chevron-left"
                size={36}
                color="#1E4274"
                style={{
                  marginRight: 330,
                  flex: 1,
                  marginTop: 45,
                }}
                onPress={() => navigation.push("SignIn")}
              />
            </View>
            <View style={styles.inputContainer}>
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
                // onChangeText={(value) => this.setState({ studentName: value })}
              />
              <Text style={styles.gender}>Gender</Text>
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
                  onPress={() =>
                    this.setState({ checked: "first", gender: "male" })
                  }
                />
                <Text
                  style={{
                    color: "#1E4274",
                    marginRight: "20%",
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
                  }}
                >
                  Female
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.gender}>Date Of Birth</Text>
                <DatePicker
                  style={{ width: 400 }}
                  date={this.state.date}
                  mode="date"
                  placeholder="  "
                  format="DD-MM-YYYY"
                  minDate="01-01-1980"
                  maxDate="01-01-2016"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      marginLeft: 10,
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
                      color: "#1E4274",
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ date: date });
                  }}
                />

                <Input
                  style={styles.input}
                  textContentType="name"
                  keyboardType="default"
                  textAlign="left"
                  inputStyle={{ color: "#1E4274" }}
                  inputContainerStyle={{
                    borderColor: "#1E4274",
                    borderBottomWidth: 2,
                  }}
                  label="Nationality"
                  labelStyle={styles.labelStyle}
                  onChangeText={(value) =>
                    this.setState({ nationality: value })
                  }
                />
                {/* <Input
                  style={styles.input}
                  textContentType="name"
                  keyboardType="default"
                  textAlign="left"
                  inputStyle={{ color: "#1E4274" }}
                  inputContainerStyle={{
                    borderColor: "#1E4274",
                    borderBottomWidth: 2,
                  }}
                  label="City"
                  labelStyle={styles.labelStyle}
                  onChangeText={(value) => this.setState({ city: value })}
                /> */}

                <CountryPicker />
              </View>
            </View>
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
    alignItems: "flex-start",
  },

  inputContainer: {
    flex: 1,
    width: 380,
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
    marginLeft: 10,
  },
});
