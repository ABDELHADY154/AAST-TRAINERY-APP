import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Button } from "galio-framework";
import { axios } from "../../../Config/Axios";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";
import { Modal, Portal } from "react-native-paper";

export default class EduInfoForm extends Component {
  state = {
    SchoolName: "",
    countryModalVisible: false,
    cityModalVisible: false,
    spinner: false,
    country: "",
    city: "",
    EducationFrom: "",
    EducationTo: "",
    EducationCredURL: null,
    EducationCredUpload: null,
    countriesList: {},
    citiesList: [],
    code: "",
    isFromDatePickerVisible: false,
    isToDatePickerVisible: false,
    schoolErr: "",
    countryErr: "",
    cityErr: "",
    fromErr: "",
    toErr: "",
  };
  toggleCountryModal = () => {
    this.setState({ countryModalVisible: !this.state.countryModalVisible });
  };
  toggleCityModal = () => {
    this.setState({ cityModalVisible: !this.state.cityModalVisible });
  };
  showFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: true });
  };
  hideFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: false });
  };
  handleFromConfirm = date => {
    this.setState({ EducationFrom: date.toISOString().split("T")[0] });
    this.hideFromDatePicker();
  };
  showToDatePicker = () => {
    this.setState({ isToDatePickerVisible: true });
  };
  hideToDatePicker = () => {
    this.setState({ isToDatePickerVisible: false });
  };
  handleToConfirm = date => {
    this.setState({ EducationTo: date.toISOString().split("T")[0] });
    this.hideToDatePicker();
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
    var formData = new FormData();

    formData.append("school_name", this.state.SchoolName);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("from", this.state.EducationFrom);
    formData.append("to", this.state.EducationTo);
    if (this.state.EducationCredURL !== null) {
      formData.append("cred_url", this.state.EducationCredURL);
    }

    if (this.state.EducationCredUpload !== null) {
      let uriParts = this.state.EducationCredUpload.split(".");
      let fileType = uriParts[uriParts.length - 1];
      formData.append("cred", {
        uri: this.state.EducationCredUpload,
        name: `${this.state.SchoolName}.${fileType}`,
        type: `file/${fileType}`,
      });
    }
    await axios({
      method: "post",
      url: "/A/student/profile/education",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        this.setState({
          spinner: false,
        });
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(error => {
        this.setState({
          spinner: false,
        });
        if (error.response.data) {
          if (error.response.data.errors) {
            this.setState({
              schoolErr: error.response.data.errors.school_name,
              countryErr: error.response.data.errors.country,
              cityErr: error.response.data.errors.city,
              fromErr: error.response.data.errors.from,
              toErr: error.response.data.errors.to,
            });
          }
        }
        console.log(error.response.data);
      });
  };

  handleUpdateSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var formData = new FormData();
    formData.append("school_name", this.state.SchoolName);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("from", this.state.EducationFrom);
    formData.append("to", this.state.EducationTo);
    if (this.state.EducationCredURL !== null) {
      formData.append("cred_url", this.state.EducationCredURL);
    }
    if (this.state.EducationCredUpload !== null) {
      let uriParts = this.state.EducationCredUpload.split(".");
      let fileType = uriParts[uriParts.length - 1];
      formData.append("cred", {
        uri: this.state.EducationCredUpload,
        name: `${this.state.SchoolName}.${fileType}`,
        type: `file/${fileType}`,
      });
    }
    await axios({
      method: "post",
      url: `/A/student/profile/education/${this.props.route.params.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        this.setState({
          spinner: false,
        });
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(error => {
        this.setState({
          spinner: false,
        });
        if (error.response.data) {
          if (error.response.data.errors) {
            this.setState({
              schoolErr: error.response.data.errors.school_name,
              countryErr: error.response.data.errors.country,
              cityErr: error.response.data.errors.city,
              fromErr: error.response.data.errors.from,
              toErr: error.response.data.errors.to,
            });
          }
        }
      });
  };
  async componentDidMount() {
    this.setState({
      spinner: true,
    });
    axios
      .get("/countriesList")
      .then(res => {
        this.setState({ countriesList: res.data });
        // if (this.state.country !== "") {
        this.countryOnchangeHandler(this.state.country);
        // }
        this.setState({
          spinner: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
    if (this.props.route.params.id > 0) {
      this.setState({
        spinner: true,
      });
      await axios
        .get(`/A/student/profile/education/${this.props.route.params.id}`)
        .then(res => {
          console.log(res.data.response.data);
          this.setState({
            SchoolName: res.data.response.data.school_name,
            country: res.data.response.data.country,
            city: res.data.response.data.city,
            EducationFrom: res.data.response.data.from,
            EducationTo: res.data.response.data.to,
            EducationCredURL: res.data.response.data.credential_url,
          });
          this.countryOnchangeHandler(this.state.country);
          this.setState({
            spinner: false,
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result) {
      this.setState({ EducationCredUpload: result.uri });
    }
  };

  handleDelete = async () => {
    this.setState({
      spinner: true,
    });
    await axios
      .delete(`/A/student/profile/education/${this.props.route.params.id}`)
      .then(res => {
        this.setState({
          spinner: false,
        });
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(err => {
        this.setState({
          spinner: false,
        });
        console.log(err.response);
      });
  };

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
          accessible={true}
          accessibilityLabel="go back"
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
        <Text style={styles.title}>Education</Text>
        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <Input
              accessible={true}
              accessibilityLabel="School Name"
              accessibilityHint={this.state.SchoolName}
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
                width: "107%",
              }}
              label="School Name"
              labelStyle={styles.labelStyle}
              value={this.state.SchoolName}
              onChangeText={value => this.setState({ SchoolName: value })}
            />
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "-7%",
                marginLeft: "3%",
                marginBottom: "2%",
                textTransform: "capitalize",
              }}
            >
              {this.state.schoolErr ? this.state.schoolErr : null}
            </Text>
            <View
              style={{
                flex: 1,
                width: "87%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: -10,
                  marginLeft: "-4.5%",
                }}
              >
                Country
              </Text>
              {Platform.OS == "android" ? (
                <View
                  style={{
                    backgroundColor: "transparent",
                    width: "112%",
                    alignSelf: "flex-start",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    alignSelf: "flex-start",
                    marginLeft: "-4.5%",
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
                    {Object.entries(this.state.countriesList).map(
                      ([el, val]) => {
                        return <Picker.Item label={val} value={val} key={el} />;
                      },
                    )}
                  </Picker>
                </View>
              ) : (
                <View
                  accessible={true}
                  accessibilityLabel="choose your Country "
                  style={{
                    backgroundColor: "transparent",
                    width: "112%",
                    alignSelf: "flex-start",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    alignSelf: "flex-start",
                    marginLeft: "-4.5%",
                  }}
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
                    onPress={this.toggleCountryModal}
                  >
                    {/* {this.state.city} */}
                    {this.state.country == ""
                      ? "choose your Country"
                      : this.state.country}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "2%",
                  marginLeft: "-4%",
                  marginBottom: "-4%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.countryErr ? this.state.countryErr : null}
              </Text>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 15,
                  marginLeft: "-5%",
                }}
              >
                City
              </Text>
              {Platform.OS == "android" ? (
                <View
                  style={{
                    backgroundColor: "transparent",
                    width: "112%",
                    alignSelf: "flex-start",
                    // marginTop: 10,
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    // marginBottom: 10,
                    alignSelf: "flex-start",
                    marginLeft: "-4.5%",
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
                    <Picker.Item label="Choose The City" value="0" />
                    {Object.entries(this.state.citiesList).map(([el, val]) => {
                      return <Picker.Item label={val} value={val} key={el} />;
                    })}
                  </Picker>
                </View>
              ) : (
                <View
                  accessible={true}
                  accessibilityLabel="choose your City "
                  style={{
                    backgroundColor: "transparent",
                    width: "112%",
                    alignSelf: "flex-start",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    alignSelf: "flex-start",
                    marginLeft: "-4.5%",
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4275",
                      fontSize: 18,
                      alignSelf: "center",
                      paddingTop: "2%",
                      paddingBottom: "1%",
                    }}
                    onPress={this.toggleCityModal}
                  >
                    {this.state.city == ""
                      ? "choose your city"
                      : this.state.city}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "1%",
                  marginLeft: "-4%",
                  marginBottom: "-4%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.cityErr ? this.state.cityErr : null}
              </Text>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 10,
                  marginLeft: "-5%",
                  marginBottom: -10,
                }}
              >
                From
              </Text>
              <View>
                <View>
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
                    accessibilityLabel=" select date from"
                    accessibilityHint={this.state.from}
                    onPress={this.showFromDatePicker}
                    color="transparent"
                    style={{
                      width: "117%",
                      marginLeft: "-5%",
                      borderColor: "transparent",

                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
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
                      {this.state.EducationFrom}
                    </Text>
                  </Button>
                </View>
              </View>
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-2%",
                  marginLeft: "-4%",
                  marginBottom: "-4%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.fromErr ? this.state.fromErr : null}
              </Text>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 10,
                  marginLeft: "-5%",
                  marginBottom: -10,
                }}
              >
                To
              </Text>
              <View>
                <View>
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
                    accessibilityLabel=" select date to"
                    accessibilityHint={this.state.to}
                    onPress={this.showToDatePicker}
                    color="transparent"
                    style={{
                      width: "117%",
                      marginLeft: "-5%",
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
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
                      {this.state.EducationTo}
                    </Text>
                  </Button>
                </View>
              </View>
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-3%",
                  marginLeft: "-4%",
                  marginBottom: "-4%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.toErr ? this.state.toErr : null}
              </Text>
              <Input
                accessible={true}
                accessibilityLabel=" enter a valid  Credential url"
                accessibilityHint={this.state.cred_url}
                style={styles.input}
                textContentType="name"
                keyboardType="default"
                textAlign="left"
                inputStyle={{ color: "#1E4274" }}
                inputContainerStyle={{
                  borderColor: "#1E4274",
                  borderBottomWidth: 2,
                  width: "122%",
                  marginLeft: "-10%",
                }}
                label="Credentials URL"
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -10,
                  marginTop: 15,
                  marginLeft: "-10%",
                }}
                // placeholder="https://www."
                placeholderTextColor="#1E4274"
                value={this.state.EducationCredURL}
                onChangeText={value =>
                  this.setState({ EducationCredURL: value })
                }
              />
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "-5%",
                  marginLeft: "-5%",
                  marginBottom: "2%",
                  textTransform: "capitalize",
                }}
              >
                https://www.example.com
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {this.state.EducationCredUpload == null ? (
                  <>
                    <Text
                      style={{
                        color: "#1E4274",
                        fontSize: 16,
                        fontFamily: "SF-M",
                        fontWeight: "normal",
                        marginBottom: 5,
                        marginLeft: "-6%",
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      Credentials Upload
                    </Text>
                    <TouchableOpacity
                      accessible={true}
                      accessibilityLabel="Upload Credential document "
                      style={{
                        marginTop: -4,
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                      color="#1E4275"
                      onPress={this._pickDocument}
                    >
                      <Feather
                        name="upload"
                        size={20}
                        color="#fff"
                        style={{
                          backgroundColor: "#1E4274",
                          padding: "5%",
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        color: "#1E4274",
                        fontSize: 16,
                        fontFamily: "SF-M",
                        fontWeight: "normal",
                        marginBottom: 5,
                        marginLeft: "-6%",
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      Credentials Uploaded
                    </Text>
                    <TouchableOpacity
                      accessible={true}
                      accessibilityLabel="Credential document Uploaded  "
                      style={{
                        marginTop: -4,
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                      color="#1E4275"
                      onPress={this._pickDocument}
                    >
                      <Feather
                        name="check-circle"
                        size={20}
                        color="#fff"
                        style={{
                          backgroundColor: "green",
                          padding: "5%",
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
            {this.props.route.params.id > 0 ? (
              <View>
                <Button
                  style={styles.button}
                  color="#1E4275"
                  onPress={this.handleUpdateSubmit}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
                </Button>
                <Button
                  style={{
                    border: 2,
                    borderColor: "#F44336",
                    borderWidth: 1,
                    width: "auto",
                    borderRadius: 50,
                    marginTop: 20,
                    backgroundColor: "#fff",
                  }}
                  color="#1E4275"
                  onPress={this.handleDelete}
                >
                  <Text
                    style={{
                      color: "#F44336",
                      fontSize: 18,
                    }}
                  >
                    Delete
                  </Text>
                </Button>
              </View>
            ) : (
              <Button
                style={styles.button}
                color="#1E4275"
                onPress={this.handleSubmit}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
              </Button>
            )}
          </ScrollView>
          <Portal>
            <Modal
              visible={this.state.countryModalVisible}
              onDismiss={this.toggleCountryModal}
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
                  onPress={this.toggleCountryModal}
                >
                  warning
                </Button>
                <View
                  style={{
                    backgroundColor: "transparent",
                    width: "118%",
                    marginLeft: "-13%",
                    // borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    // borderBottomWidth: 2,
                    borderRadius: 0,
                    alignSelf: "flex-start",
                  }}
                >
                  <Picker
                    mode="dialog"
                    style={{
                      color: "#1E4275",
                      marginLeft: "5%",
                      // borderColor: "#1E4275",
                      borderTopWidth: 0,
                      borderRightWidth: 0,
                      borderLeftWidth: 0,
                      // borderBottomWidth: 10,
                      borderRadius: 0,
                      backgroundColor: "transparent",
                    }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#1E4275" }}
                    placeholderIconColor="#1E4275"
                    itemStyle={{ backgroundColor: "transparent" }}
                    dropdownIconColor="#1E4275"
                    selectedValue={this.state.country}
                    onValueChange={this.countryOnchangeHandler}
                  >
                    <Picker.Item label="Choose Your Country" value="0" />
                    {Object.entries(this.state.countriesList).map(
                      ([el, val]) => {
                        return <Picker.Item label={val} value={val} key={el} />;
                      },
                    )}
                  </Picker>
                </View>
              </View>
            </Modal>
          </Portal>
          <Portal>
            <Modal
              visible={this.state.cityModalVisible}
              onDismiss={this.toggleCityModal}
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
                  onPress={this.toggleCityModal}
                >
                  warning
                </Button>
                <View
                  style={{
                    backgroundColor: "transparent",
                    width: "118%",
                    marginLeft: "-13%",
                    // borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    // borderBottomWidth: 2,
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
                    itemStyle={{ backgroundColor: "transparent" }}
                    dropdownIconColor="#1E4275"
                    selectedValue={this.state.city}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ city: itemValue });
                    }}
                  >
                    <Picker.Item label="Choose The City" value="0" />
                    {Object.entries(this.state.citiesList).map(([el, val]) => {
                      return <Picker.Item label={val} value={val} key={el} />;
                    })}
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
    marginLeft: "5.7%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "91%",
    alignSelf: "center",
    marginLeft: "-2.5%",
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
    // marginLeft: 10,
  },
  boxContainer: {
    backgroundColor: "transparent",
    width: "107%",
    alignSelf: "flex-start",
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
