import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { axios } from "../../../Config/Axios";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";
import { Modal, Portal } from "react-native-paper";

export default class Academicinfo extends Component {
  state = {
    departments: [],
    university: "",
    spinner: true,
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
    universityModalVisible: false,
    DepModalVisible: false,
    termModalVisible: false,
  };
  toggleUniversityModal = () => {
    this.setState({
      universityModalVisible: !this.state.universityModalVisible,
    });
  };
  toggleDepModal = () => {
    this.setState({
      DepModalVisible: !this.state.DepModalVisible,
    });
  };
  toggleTermModal = () => {
    this.setState({
      termModalVisible: !this.state.termModalVisible,
    });
  };
  componentDidMount() {
    axios
      .get("departments")
      .then(response => {
        this.setState({ departments: response.data.response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/A/student/profile/academic")
      .then(res => {
        this.setState({
          university: res.data.response.data.university,
          department: res.data.response.data.department,
          reg_no: `${res.data.response.data.reg_no}`,
          period: `${res.data.response.data.period}`,
          gpa: `${res.data.response.data.gpa}`,
          start_year: res.data.response.data.start_year,
          end_year: res.data.response.data.end_year,
        });
        for (const key in this.state.departments) {
          if (Object.hasOwnProperty.call(this.state.departments, key)) {
            const element = this.state.departments[key];
            if (this.state.department == element.dep_name) {
              this.setState({ department_id: element.id, spinner: false });
            }
          }
        }
        if (this.state.gpa == "null") {
          this.setState({ gpa: "" });
        }
        this.setState({
          spinner: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  showFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: true });
  };
  hideFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: false });
  };
  handleFromConfirm = date => {
    this.setState({ start_year: date.getFullYear() });

    this.hideFromDatePicker();
  };
  showToDatePicker = () => {
    this.setState({ isToDatePickerVisible: true });
  };
  hideToDatePicker = () => {
    this.setState({ isToDatePickerVisible: false });
  };
  handleToConfirm = date => {
    this.setState({ end_year: date.getFullYear() });
    this.hideToDatePicker();
  };
  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
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
      .then(res => {
        this.props.navigation.push("App", {
          screen: "Profile",
        });
        this.setState({
          spinner: false,
        });
        // console.log(res.response.data);
      })
      .catch(error => {
        this.setState({
          spinner: false,
        });
        if (error.response) {
          if (error.response.data.errors) {
            this.setState({
              reg_noErr: error.response.data.errors.reg_no,
              department_idErr: error.response.data.errors.department_id,
              gpaErr: error.response.data.errors.gpa,
              universityErr: error.response.data.errors.university,
              periodErr: error.response.data.errors.period,
            });
          }
          // console.log(error.response.data.errors.period)
        }
      });
  };

  render() {
    const gpa = this.state.gpa;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          cancelable={false}
          size="large"
          color="#1E4274"
          animation="fade"
          overlayColor="rgba(255, 255, 255, 0.8)"
          textStyle={{ color: "#1E4274", textAlign: "center" }}
        />
        <Feather
          accessible={true}
          accessibilityLabel="go back"
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "4%",
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
              {Platform.OS == "android" ? (
                <View
                  style={{
                    alignContent: "flex-start",
                    backgroundColor: "transparent",
                    width: "101%",
                    justifyContent: "flex-start",

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
                    placeholderStyle={{ color: "#1E4275" }}
                    placeholderIconColor="#1E4275"
                    itemStyle={{ backgroundColor: "#fff" }}
                    dropdownIconColor="#1E4275"
                    selectedValue={this.state.university}
                    onValueChange={value =>
                      this.setState({ university: value })
                    }
                  >
                    <Picker.Item label="Choose Your University" />
                    <Picker.Item label="AAST CMT" value="AAST CMT" />
                    <Picker.Item label="AAST CLC" value="AAST CLC" />
                  </Picker>
                </View>
              ) : (
                <View
                  accessible={true}
                  accessibilityLabel="choose your University "
                  style={styles.boxContainer}
                >
                  <Text
                    style={{
                      color: "#1E4275",
                      fontSize: 18,
                      alignSelf: "center",
                      // textAlign: "left",
                      paddingTop: "2%",
                      paddingBottom: "1%",
                    }}
                    onPress={this.toggleUniversityModal}
                  >
                    {/* {this.state.city} */}
                    {this.state.university == ""
                      ? "choose your university"
                      : this.state.university}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                {this.state.universityErr ? this.state.universityErr : null}
              </Text>
              <Text style={styles.gender}>Department</Text>
              {Platform.OS == "android" ? (
                <View
                  style={{
                    alignContent: "flex-start",
                    backgroundColor: "transparent",
                    width: "101%",
                    justifyContent: "flex-start",

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
                    selectedValue={this.state.department_id}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        department_id: itemValue,
                      })
                    }
                  >
                    <Picker.Item label="Choose Your Department" value="0" />
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
                  accessibilityLabel="choose your Department "
                  style={styles.boxContainer}
                >
                  <Text
                    style={{
                      color: "#1E4275",
                      fontSize: 18,
                      alignSelf: "center",
                      paddingTop: "2%",
                      paddingBottom: "1%",
                    }}
                    onPress={this.toggleDepModal}
                  >
                    {this.state.department_id == ""
                      ? this.state.department
                      : this.state.departments.map(i => {
                          if (i.id == this.state.department_id) {
                            return i.dep_name;
                          }
                        })}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                {this.state.department_idErr
                  ? this.state.department_idErr
                  : null}
              </Text>
              <Input
                accessible={true}
                accessibilityLabel="Registration Number"
                accessibilityHint={this.state.reg_no}
                style={{
                  alignSelf: "flex-start",
                  alignContent: "flex-start",
                  backgroundColor: "transparent",
                  height: 35,
                }}
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                  marginLeft: "-3%",
                  width: "107.05%",
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
                // errorMessage={this.state.reg_noErr}
                value={this.state.reg_no}
                onChangeText={value => this.setState({ reg_no: value })}
              />
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-7%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.reg_noErr ? this.state.reg_noErr : null}
              </Text>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                }}
              >
                Term
              </Text>
              {Platform.OS == "android" ? (
                <View
                  style={{
                    alignContent: "flex-start",
                    backgroundColor: "transparent",
                    width: "101.5%",
                    justifyContent: "flex-start",
                    marginLeft: "-0.5%",
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
                    accessible={true}
                    accessibilityLabel="choose your term "
                    accessibilityHint={this.state.period}
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
                    <Picker.Item label=" Choose Your Term" value={0} />
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
              ) : (
                <View
                  accessible={true}
                  accessibilityLabel="choose your Term "
                  style={styles.boxContainer}
                >
                  <Text
                    style={{
                      color: "#1E4275",
                      fontSize: 18,
                      alignSelf: "center",
                      paddingTop: "2%",
                      paddingBottom: "1%",
                    }}
                    onPress={this.toggleTermModal}
                  >
                    {this.state.period == ""
                      ? "choose a period"
                      : this.state.period}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  textTransform: "capitalize",
                }}
              >
                {this.state.periodErr ? this.state.periodErr : null}
              </Text>
              <Input
                accessible={true}
                accessibilityLabel="gpa "
                accessibilityHint={this.state.gpa}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "#1E4275", marginLeft: "1%" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                  marginLeft: "-4%",
                  width: "108%",
                }}
                label="GPA"
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -7,
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: 15,
                  marginLeft: "-3%",
                }}
                value={gpa}
                // errorMessage={this.state.gpaErr}
                onChangeText={value => this.setState({ gpa: value })}
              />
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-7%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.gpaErr ? this.state.gpaErr : " "}
              </Text>
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
              <View
                style={{
                  alignContent: "flex-start",
                  backgroundColor: "transparent",
                  width: "102%",
                  justifyContent: "flex-start",
                  marginLeft: "-1%",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                }}
              >
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
                  accessible={true}
                  accessibilityLabel=" start year"
                  accessibilityHint={`${this.state.start_year}`}
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
                      marginLeft: "-5%",
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
                      textTransform: "capitalize",
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
              <View
                style={{
                  alignContent: "flex-start",
                  backgroundColor: "transparent",
                  width: "103%",
                  justifyContent: "flex-start",
                  marginLeft: "-1.5%",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                }}
              >
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
                  accessible={true}
                  accessibilityLabel=" end year"
                  accessibilityHint={`${this.state.end_year}`}
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
                      marginLeft: "-5%",
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
                    textTransform: "capitalize",
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
          <Portal>
            <Modal
              visible={this.state.DepModalVisible}
              onDismiss={this.toggleDepModal}
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
                  onPress={this.toggleDepModal}
                >
                  warning
                </Button>
                <View
                  style={{
                    alignContent: "flex-start",
                    backgroundColor: "transparent",
                    width: "101%",
                    justifyContent: "flex-start",

                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 0,
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
                      borderBottomWidth: 0,
                      borderRadius: 0,
                    }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#1E4275" }}
                    placeholderIconColor="#1E4275"
                    itemStyle={{ backgroundColor: "#fff" }}
                    dropdownIconColor="#1E4275"
                    selectedValue={this.state.department_id}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        department_id: itemValue,
                        department: itemValue,
                      })
                    }
                  >
                    <Picker.Item label="Choose Your Department" value="0" />
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
              </View>
            </Modal>
          </Portal>
          <Portal>
            <Modal
              visible={this.state.termModalVisible}
              onDismiss={this.toggleTermModal}
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
                  onPress={this.toggleTermModal}
                >
                  warning
                </Button>
                <View
                  style={{
                    alignContent: "flex-start",
                    backgroundColor: "transparent",
                    width: "101.5%",
                    justifyContent: "flex-start",
                    marginLeft: "-0.5%",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 0,
                    borderRadius: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  <Picker
                    accessible={true}
                    accessibilityLabel="choose your term "
                    accessibilityHint={this.state.period}
                    mode="dialog"
                    style={{
                      color: "#1E4275",
                      borderColor: "#1E4275",
                      borderTopWidth: 0,
                      borderRightWidth: 0,
                      borderLeftWidth: 0,
                      borderBottomWidth: 0,
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
                    <Picker.Item label=" Choose Your Term" value={0} />
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
              </View>
            </Modal>
          </Portal>
          <Portal>
            <Modal
              visible={this.state.universityModalVisible}
              onDismiss={this.toggleUniversityModal}
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
                  onPress={this.toggleUniversityModal}
                >
                  warning
                </Button>
                <View
                  style={{
                    alignContent: "flex-start",
                    backgroundColor: "transparent",
                    width: "101%",
                    justifyContent: "flex-start",

                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 0,
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
                      borderBottomWidth: 0,
                      borderRadius: 0,
                    }}
                    placeholderStyle={{ color: "#1E4275" }}
                    placeholderIconColor="#1E4275"
                    itemStyle={{ backgroundColor: "#fff" }}
                    dropdownIconColor="#1E4275"
                    selectedValue={this.state.university}
                    onValueChange={value =>
                      this.setState({ university: value })
                    }
                  >
                    <Picker.Item label="Choose Your University" />
                    <Picker.Item label="AAST CMT" value="AAST CMT" />
                    <Picker.Item label="AAST CLC" value="AAST CLC" />
                  </Picker>
                </View>
              </View>
            </Modal>
          </Portal>
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
    marginLeft: "6.5%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "93.5%",
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
