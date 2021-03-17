import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";

export default class ExpInfoForm extends Component {
  state = {
    experience_type: "",
    job_title: "",
    company_name: "",
    country: "",
    city: "",
    from: "",
    to: "",
    cred_url: null,
    cred: null,
    expErr: "",
    jobErr: "",
    companyErr: "",
    countryErr: "",
    cityErr: "",
    fromErr: "",
    toErr: "",
    countriesList: {},
    citiesList: [],
    code: "",
    isFromDatePickerVisible: false,
    isToDatePickerVisible: false,
    currently_work: 1,
  };

  showFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: true });
  };
  hideFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: false });
  };
  handleFromConfirm = date => {
    // console.log("A date has been picked: ", date);
    this.setState({ from: date.toISOString().split("T")[0] });
    this.hideFromDatePicker();
  };
  showToDatePicker = () => {
    this.setState({ isToDatePickerVisible: true });
  };
  hideToDatePicker = () => {
    this.setState({ isToDatePickerVisible: false });
  };
  handleToConfirm = date => {
    // console.log("A date has been picked: ", date);
    this.setState({ to: date.toISOString().split("T")[0] });
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
    var formData = new FormData();
    formData.append("currently_work", this.state.currently_work);
    formData.append("experience_type", this.state.experience_type);
    formData.append("job_title", this.state.job_title);
    formData.append("company_name", this.state.company_name);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("company_website", "https://www.google.com");
    formData.append("from", this.state.from);
    formData.append("to", this.state.to);
    if (this.state.cred_url !== null) {
      formData.append("cred_url", this.state.cred_url);
    }
    if (this.state.cred !== null) {
      let uriParts = this.state.cred.split(".");
      let fileType = uriParts[uriParts.length - 1];
      formData.append("cred", {
        uri: this.state.cred,
        name: `${this.state.job_title}.${fileType}`,
        type: `file/${fileType}`,
      });
    }
    await axios({
      method: "POST",
      url: "/A/student/profile/experience",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        console.log(res.response);
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response.data.errors.experience_type) {
          this.setState({
            expErr: error.response.data.errors.experience_type,
          });
        }
        if (error.response.data.errors.job_title) {
          this.setState({
            jobErr: error.response.data.errors.job_title,
          });
        }
        if (error.response.data.errors.company_name) {
          this.setState({
            companyErr: error.response.data.errors.company_name,
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
    formData.append("currently_work", this.state.currently_work);
    formData.append("experience_type", this.state.experience_type);
    formData.append("job_title", this.state.job_title);
    formData.append("company_name", this.state.company_name);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("from", this.state.from);
    formData.append("to", this.state.to);
    formData.append("company_website", "https://www.google.com");

    if (this.state.cred_url !== null) {
      formData.append("cred_url", this.state.cred_url);
    }
    if (this.state.cred !== null) {
      let uriParts = this.state.cred.split(".");
      let fileType = uriParts[uriParts.length - 1];
      formData.append("cred", {
        uri: this.state.cred,
        name: `${this.state.job_title}.${fileType}`,
        type: `file/${fileType}`,
      });
    }
    await axios({
      method: "post",
      url: `/A/student/profile/experience/${this.props.route.params.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        console.log(res.response);
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(error => {
        if (error.response.data.errors.experience_type) {
          this.setState({
            expErr: error.response.data.errors.experience_type,
          });
        }
        if (error.response.data.errors.job_title) {
          this.setState({
            jobErr: error.response.data.errors.job_title,
          });
        }
        if (error.response.data.errors.company_name) {
          this.setState({
            companyErr: error.response.data.errors.company_name,
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
      .then(res => {
        this.setState({ countriesList: res.data });
        if (this.state.country !== "") {
          this.countryOnchangeHandler(this.state.country);
        }
      })
      .catch(err => {
        console.log(err);
      });
    if (this.props.route.params.id > 0) {
      await axios
        .get(`/A/student/profile/experience/${this.props.route.params.id}`)
        .then(res => {
          this.setState({
            experience_type: res.data.response.data.experience_type,
            job_title: res.data.response.data.job_title,
            company_name: res.data.response.data.company_name,

            country: res.data.response.data.country,
            city: res.data.response.data.city,
            from: res.data.response.data.from,
            to: res.data.response.data.to,
            cred_url: res.data.response.data.cred_url,
          });
          console.log(this.props.route.params.id);

          // console.log(res.data.response.data);
        })
        .catch(error => {
          if (error.response.data.errors.experience_type) {
            this.setState({
              expErr: error.response.data.errors.experience_type,
            });
          }
          if (error.response.data.errors.job_title) {
            this.setState({
              jobErr: error.response.data.errors.job_title,
            });
          }
          if (error.response.data.errors.company_name) {
            this.setState({
              companyErr: error.response.data.errors.company_name,
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
      this.setState({ cred: result.uri });
    }
  };
  handleDelete = async () => {
    await axios
      .delete(`/A/student/profile/experience/${this.props.route.params.id}`)
      .then(res => {
        console.log(res);
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(err => {
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
            // flex: 1,
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Experience</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <Text
              style={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginTop: 15,
                marginLeft: "2.5%",
              }}
            >
              Experience Type
            </Text>
            <View
              style={{
                backgroundColor: "transparent",
                width: "99%",
                marginLeft: "2%",
                alignSelf: "flex-start",
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
                selectedValue={this.state.experience_type}
                onValueChange={value =>
                  this.setState({ experience_type: value })
                }
              >
                <Picker.Item label="Choose Your Experience Type" value="0" />
                <Picker.Item label="Internship" value="Internship" />
                <Picker.Item label="Volunteer" value="Volunteer" />
              </Picker>
            </View>
            {this.state.expErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  marginLeft: "2%",
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
                  {this.state.expErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <Input
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                width: "109%",
                marginLeft: "-1.5%",
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Job Title"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
                marginLeft: "-1%",
              }}
              value={this.state.job_title}
              onChangeText={value => this.setState({ job_title: value })}
            />
            {this.state.jobErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  marginLeft: "2%",
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: -15,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.jobErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <Input
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                width: "109%",
                marginLeft: "-1.5%",
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Company Name"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginLeft: "-1%",
              }}
              value={this.state.company_name}
              onChangeText={value => this.setState({ company_name: value })}
            />
            {this.state.companyErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  marginLeft: "2%",
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: -15,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.companyErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
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
              {this.state.countryErr != "" ? (
                <View
                  style={{
                    justifyContent: "space-between",
                    marginLeft: "-3%",
                    alignSelf: "flex-start",
                    flexDirection: "row",
                    width: "91.5%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#F44336",
                      fontSize: 14,
                      textAlign: "left",
                    }}
                  >
                    {this.state.countryErr}
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
                  marginTop: 5,
                  marginLeft: "-5%",
                }}
              >
                City
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "113%",
                  alignSelf: "flex-start",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                  marginLeft: "-5.5%",
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
              {this.state.cityErr != "" ? (
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
                    {this.state.cityErr}
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
                      {this.state.from}
                    </Text>
                  </Button>
                </View>
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
                      {this.state.to}
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
                value={this.state.cred_url}
                onChangeText={value => this.setState({ cred_url: value })}
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
