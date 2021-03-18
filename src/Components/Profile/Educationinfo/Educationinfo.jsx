import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
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

export default class EduInfoForm extends Component {
  state = {
    SchoolName: "",
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
  showFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: true });
  };
  hideFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: false });
  };
  handleFromConfirm = (date) => {
    this.setState({ EducationFrom: date.toISOString().split("T")[0] });
    this.hideFromDatePicker();
  };
  showToDatePicker = () => {
    this.setState({ isToDatePickerVisible: true });
  };
  hideToDatePicker = () => {
    this.setState({ isToDatePickerVisible: false });
  };
  handleToConfirm = (date) => {
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
  getCityList = (code) => {
    axios
      .get(`/stateList/${code}`)
      .then((res) => {
        this.setState({ citiesList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = async () => {
    var formData = new FormData();

    formData.append("school_name", this.state.SchoolName);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("from", this.state.EducationFrom);
    formData.append("to", this.state.EducationTo);
    formData.append("cred_url", this.state.EducationCredURL);
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
      .then((res) => {
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch((error) => {
        if (error.response.data.errors.school_name) {
          this.setState({
            schoolErr: error.response.data.errors.school_name,
          });
        }
        if (error.response.data.errors.country) {
          this.setState({
            countryErr: error.response.data.errors.country,
          });
        }
        if (error.response.data.errors.city) {
          this.setState({
            cityErr: error.response.data.errors.city,
          });
        }
        if (error.response.data.errors.from) {
          this.setState({
            fromErr: error.response.data.errors.from,
          });
        }
        if (error.response.data.errors.to) {
          this.setState({
            toErr: error.response.data.errors.to,
          });
        }
      });
  };

  handleUpdateSubmit = async () => {
    var formData = new FormData();
    formData.append("school_name", this.state.SchoolName);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("from", this.state.EducationFrom);
    formData.append("to", this.state.EducationTo);
    formData.append("cred_url", this.state.EducationCredURL);
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
      .then((res) => {
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch((error) => {
        console.log("update bayez alo");
        if (error.response.data.errors.school_name) {
          this.setState({
            schoolErr: error.response.data.errors.school_name,
          });
        }
        if (error.response.data.errors.country) {
          this.setState({
            countryErr: error.response.data.errors.country,
          });
        }
        if (error.response.data.errors.city) {
          this.setState({
            cityErr: error.response.data.errors.city,
          });
        }
        if (error.response.data.errors.from) {
          this.setState({
            fromErr: error.response.data.errors.from,
          });
        }
        if (error.response.data.errors.to) {
          this.setState({
            toErr: error.response.data.errors.to,
          });
        }
      });
  };
  async componentDidMount() {
    axios
      .get("/countriesList")
      .then((res) => {
        this.setState({ countriesList: res.data });
        if (this.state.country !== "") {
          // console.log(this.state.country);
          this.countryOnchangeHandler(this.state.country);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.props.route.params.id > 0) {
      await axios
        .get(`/A/student/profile/education/${this.props.route.params.id}`)
        .then((res) => {
          this.setState({
            SchoolName: res.data.response.data.school_name,
            country: res.data.response.data.country,
            city: res.data.response.data.city,
            EducationFrom: res.data.response.data.from,
            EducationTo: res.data.response.data.to,
            EducationCredURL: res.data.response.data.credential_url,
          });
          // console.log(this.props.route.params.id);

          // console.log(res.data.response.data);
        })
        .catch((error) => {
          if (error.response.data.errors.school_name) {
            this.setState({
              schoolErr: error.response.data.errors.school_name,
            });
          }
          if (error.response.data.errors.country) {
            this.setState({
              countryErr: error.response.data.errors.country,
            });
          }
          if (error.response.data.errors.city) {
            this.setState({
              cityErr: error.response.data.errors.city,
            });
          }
          if (error.response.data.errors.from) {
            this.setState({
              fromErr: error.response.data.errors.from,
            });
          }
          if (error.response.data.errors.to) {
            this.setState({
              toErr: error.response.data.errors.to,
            });
          }
        });
    }
  }

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // console.log(result);
    if (result) {
      this.setState({ EducationCredUpload: result.uri });
    }
  };

  handleDelete = async () => {
    await axios
      .delete(`/A/student/profile/education/${this.props.route.params.id}`)
      .then((res) => {
        console.log(res);
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}></SafeAreaView> */}

        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "6%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Education</Text>

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
                width: "107%",
              }}
              label="School Name"
              labelStyle={styles.labelStyle}
              value={this.state.SchoolName}
              onChangeText={(value) => this.setState({ SchoolName: value })}
            />
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "-7%",
                marginLeft: "3%",
                marginBottom: "2%",
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
                  marginLeft: "-5%",
                }}
              >
                Country
              </Text>
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
                  {Object.entries(this.state.countriesList).map(([el, val]) => {
                    return <Picker.Item label={val} value={val} key={el} />;
                  })}
                </Picker>
              </View>
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "2%",
                  marginLeft: "-4%",
                  marginBottom: "-4%",
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
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "1%",
                  marginLeft: "-4%",
                  marginBottom: "-4%",
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
                }}
              >
                {this.state.toErr ? this.state.toErr : null}
              </Text>
              <Input
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
                placeholder="https://www."
                placeholderTextColor="#1E4274"
                value={this.state.EducationCredURL}
                onChangeText={(value) =>
                  this.setState({ EducationCredURL: value })
                }
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#1E4274",
                    fontSize: 16,
                    fontFamily: "SF-M",
                    fontWeight: "normal",
                    marginBottom: 5,
                    marginLeft: "-6%",
                  }}
                >
                  Credentials Upload
                </Text>
                <Button
                  style={{
                    borderRadius: 5,
                    width: "11%",
                    height: "36%",
                    marginTop: -4,
                    marginLeft: "49%",
                  }}
                  color="#1E4275"
                  onPress={this._pickDocument}
                >
                  <Feather name="upload" size={20} color="#fff" />
                </Button>
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
