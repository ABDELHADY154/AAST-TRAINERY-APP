import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Button } from "galio-framework";
import DatePicker from "react-native-datepicker";
export default class Academicinfo extends Component {
  state = {
    SchoolName: "",
    countryname: "",
    cityname: "",
    EducationFrom: "",
    EducationTo: "",
    EducationCredURL: "",
    EducationCredUpload: "",
  };
  constructor(props) {
    super(props);
    this.state = { date: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}></SafeAreaView> */}

        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            marginRight: 340,
            // flex: 1,
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => navigation.push("SignIn")}
        />
        <Text style={styles.title}>Academics</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <Text style={styles.gender}>University</Text>
              <View style={styles.boxContainer}>
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
                  placeholderStyle={{ color: "#1E4275" }}
                  placeholderIconColor="#1E4275"
                  itemStyle={{ backgroundColor: "#fff" }}
                  dropdownIconColor="#1E4275"
                  selectedValue={"AAST"}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   this.setState({ UniversityName: itemValue })
                  // }
                >
                  <Picker.Item label="Choose Your University" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.UniversityName}
                          value={key.id}
                          key={key.id}
                        />
                      );
                    })} */}
                </Picker>
              </View>
              <Text style={styles.gender}>Department</Text>
              <View style={styles.boxContainer}>
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
                  selectedValue={"Alexandria"}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   this.setState({ DepartmentName: itemValue })
                  // }
                >
                  <Picker.Item label="Choose Your Department" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.DepartmentName}
                          value={key.id}
                          key={key.id}
                        />
                      );
                    })} */}
                </Picker>
              </View>
              <Input
                style={styles.input}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                }}
                label="Registration Number"
                labelStyle={styles.labelStyle}
                // onChangeText={value => this.setState({ regNo: value })}
              />
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",

                  marginLeft: 10,
                }}
              >
                Term Period
              </Text>
              <View style={styles.boxContainer}>
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
                  selectedValue={"8"}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   this.setState({ TermNumber: itemValue })
                  // }
                >
                  <Picker.Item label=" Choose Your Term" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.TermNumber}
                          value={key.id}
                          key={key.id}
                        />
                      );
                    })} */}
                </Picker>
              </View>
              <Input
                style={styles.input}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                }}
                label="GPA"
                labelStyle={styles.labelStyle}
                // onChangeText={value => this.setState({ StudentGpa: value })}
              />
              <Text style={styles.gender}>Start Year</Text>
              <DatePicker
                style={{ width: 370 }}
                date={this.state.AcademicsStartYear}
                mode="date"
                placeholder="  "
                format="DD-MM-YYYY"
                minDate="1-1-1999"
                maxDate="1-1-2029"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                // iconSource={{
                //   uri:
                //     "https://https://react-icons.github.io/react-icons/icons?name=ai/AiOutlineCalendar",
                // }}
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
                  this.setState({ AcademicsStartYear: date });
                }}
              />
              <Text style={styles.gender}>End Year</Text>
              <DatePicker
                style={{ width: 370 }}
                date={this.state.AcademicsEndYear}
                mode="date"
                placeholder="  "
                format="DD-MM-YYYY"
                minDate="1-1-1999"
                maxDate="1-1-2029"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                // iconSource={{
                //   uri:
                //     "https://https://react-icons.github.io/react-icons/icons?name=ai/AiOutlineCalendar",
                // }}
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
                  this.setState({ AcademicsEndYear: date });
                }}
              />
            </View>
            <Button
              style={styles.button}
              color="#1E4275"
              // onPress={this.submit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
            </Button>
            <Button
              style={styles.button}
              color="#1E4275"
              // onPress={this.submit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
            </Button>
          </ScrollView>
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
  },
  title: {
    marginLeft: -240,
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
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
  boxContainer: {
    backgroundColor: "transparent",
    width: 360,
    marginLeft: 10,
    // marginTop: 10,
    borderColor: "#1E4275",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    // marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
