import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { axios } from "../../../Config/Axios";

export default class Academicinfo extends Component {
  state = {
    departments: [],
    university: "",
    universityErr: "",
    department_id: "",
    department: "",
    department_idErr: "",
    reg_no: "",
    reg_noErr: "",
    period: "",
    periodErr: "",
    gpa: "",
    gpaErr: "",
    start_year: 0,
    fromErr: "",
    end_year: 0,
    toErr: "",
  };
  componentDidMount() {
    axios
      .get("departments")
      .then((response) => {
        this.setState({ departments: response.data.response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get("/A/student/profile/academic").then((res) => {
      // console.log(res.data.response.data);
      this.setState({
        university: res.data.response.data.university,
        department_id: res.data.response.data.department_id,
        reg_no: res.data.response.data.reg_no,
        period: res.data.response.data.period,
        gpa: res.data.response.data.gpa,
        start_year: res.data.response.data.start_year,
        end_year: res.data.response.data.end_year,
      });
    });
    this.state.departments.forEach((element) => {
      // console.log(element.dep_name);
      if (this.state.department == element.id) {
        this.setState({ department_id: element.dep_name });
      }
    });
  }

  showFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: true });
  };
  hideFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: false });
  };
  handleFromConfirm = (date) => {
    this.setState({ start_year: date.toISOString().split("T")[0] });
    this.hideFromDatePicker();
  };
  showToDatePicker = () => {
    this.setState({ isToDatePickerVisible: true });
  };
  hideToDatePicker = () => {
    this.setState({ isToDatePickerVisible: false });
  };
  handleToConfirm = (date) => {
    this.setState({ end_year: date.toISOString().split("T")[0] });
    this.hideToDatePicker();
  };
  handleSubmit = async () => {
    const data = {
      university: this.state.university,
      department_id: this.state.department_id,
      reg_no: this.state.reg_no,
      period: this.state.period,
      gpa: this.state.gpa,
      start_year: this.state.start_year,
      end_year: this.state.end_year,
    };
    await axios

      .put("/A/student/profile/academic", data)
      .then((res) => {
        this.props.navigation.push("App", {
          screen: "Profile",
        });
      })
      .catch((error) => {
        if (error.response.data.errors.university) {
          this.setState({
            universityErr: error.response.data.errors.university,
          });
        }
        if (error.response.data.errors.department_id) {
          this.setState({
            department_idErr: error.response.data.errors.department_id,
          });
        }
        if (error.response.data.errors.reg_no) {
          this.setState({
            reg_noErr: error.response.data.errors.reg_no,
          });
        }
        if (error.response.data.errors.period) {
          this.setState({
            periodErr: error.response.data.errors.period,
          });
        }
        if (error.response.data.errors.gpa) {
          this.setState({
            gpaErr: error.response.data.errors.gpa,
          });
        }
        if (error.response.data.errors.start_year) {
          this.setState({
            start_yearErr: error.response.data.errors.start_year,
          });
        }
        if (error.response.data.errors.end_year) {
          this.setState({
            end_yearErr: error.response.data.errors.end_year,
          });
        }
      });
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "7%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
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
                  selectedValue={this.state.university}
                  onValueChange={(value) =>
                    this.setState({ university: value })
                  }
                >
                  <Picker.Item label="Choose Your University" value="0" />
                  <Picker.Item label="AAST CMT" value="AAST CMT" />
                  <Picker.Item label="AAST CLC" value="AAST CLC" />
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
                  selectedValue={this.state.department}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      department_id: itemValue,
                      // department_id: itemIndex++,
                    })
                  }
                >
                  <Picker.Item label="Choose Your Department" value="0" />
                  {this.state.departments.map((key) => {
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
              <Input
                style={{
                  alignSelf: "flex-start",

                  alignContent: "flex-start",
                  backgroundColor: "transparent",
                  height: 35,
                }}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                  marginLeft: "-3%",
                  width: "106%",
                }}
                label="Registration Number"
                labelStyle={{
                  marginLeft: "-3%",
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -10,
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: 15,
                }}
                value={this.state.reg_no}
                onChangeText={(value) => this.setState({ reg_no: value })}
              />
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
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
                  selectedValue={this.state.period}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ period: itemValue })
                  }
                >
                  <Picker.Item label=" Choose Your Term" value="0" />
                  <Picker.Item label="  1" value="1" />
                  <Picker.Item label="  2" value="2" />
                  <Picker.Item label="  3" value="3" />
                  <Picker.Item label="  4" value="4" />
                  <Picker.Item label="  5" value="5" />
                  <Picker.Item label="  6" value="6" />
                  <Picker.Item label="  7" value="7" />
                  <Picker.Item label="  8" value="8" />
                </Picker>
              </View>
              <Input
                // style={styles.input}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                  marginLeft: "-4%",
                  width: "107%",
                }}
                label="GPA"
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -10,
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: 15,
                  marginLeft: "-3%",
                }}
                value={this.state.gpa}
                onChangeText={(value) => this.setState({ gpa: value })}
              />
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                }}
              >
                Start Year
              </Text>
              <View style={styles.boxContainer}>
                <DateTimePickerModal
                  isVisible={this.state.isFromDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleFromConfirm}
                  onCancel={this.hideFromDatePicker}
                />
                <Feather
                  onPress={this.showFromDatePicker}
                  name="calendar"
                  size={22}
                  color="#1E4274"
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-end",
                  }}
                ></Feather>

                <Button
                  onPress={this.showFromDatePicker}
                  color="transparent"
                  style={{
                    width: "117%",
                    marginLeft: "-5%",
                    borderColor: "transparent",

                    borderBottomColor: "#1E4274",
                    borderBottomWidth: 0,
                    borderRadius: 0,
                    marginTop: -35,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#1E4274",
                    }}
                  >
                    {this.state.start_year}
                  </Text>
                </Button>
              </View>
              {this.state.fromErr != "" ? (
                <View
                  style={{
                    marginLeft: "-4%",

                    justifyContent: "space-between",
                    alignSelf: "flex-start",
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
                    {this.state.fromErr}
                  </Text>
                </View>
              ) : (
                <Text></Text>
              )}
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 20,
                  // marginLeft: 10,
                }}
              >
                End Year
              </Text>
              <View style={styles.boxContainer}>
                <DateTimePickerModal
                  isVisible={this.state.isToDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleToConfirm}
                  onCancel={this.hideToDatePicker}
                />
                <Feather
                  onPress={this.showToDatePicker}
                  name="calendar"
                  size={22}
                  color="#1E4274"
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-end",
                  }}
                ></Feather>
                <Button
                  onPress={this.showToDatePicker}
                  color="transparent"
                  style={{
                    width: "117%",
                    marginLeft: "-5%",
                    borderColor: "transparent",
                    borderBottomColor: "#1E4274",
                    borderBottomWidth: 0,
                    borderRadius: 0,
                    marginTop: -35,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#1E4274",
                    }}
                  >
                    {this.state.end_year}
                  </Text>
                </Button>
              </View>
            </View>
            {this.state.toErr != "" ? (
              <View
                style={{
                  marginLeft: "-4%",

                  justifyContent: "space-between",
                  alignSelf: "flex-start",
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
                  {this.state.toErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}

            <Button
              style={styles.button}
              color="#1E4275"
              onPress={this.handleSubmit}
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
    alignSelf: "center",
    width: "100%",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "9.5%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  labelStyle: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginBottom: -10,
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginTop: 15,
  },
  input: {
    alignSelf: "flex-start",

    alignContent: "flex-start",
    backgroundColor: "transparent",
    height: 35,
  },
  gender: {
    alignSelf: "flex-start",

    alignContent: "flex-start",
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginTop: 15,
    // marginLeft: 10,
  },
  boxContainer: {
    alignSelf: "flex-start",

    alignContent: "flex-start",
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "flex-start",

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
    marginTop: 10,
  },
});
