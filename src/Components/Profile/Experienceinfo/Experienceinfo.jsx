import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";

export default class ExpInfoForm extends Component {
  state = {
    experience_type: "",
    spinner: false,
    job_title: "",
    company_name: "",
    company_website: "",
    companywebErr: "",
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
  handleFromConfirm = (date) => {
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
  handleToConfirm = (date) => {
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
    this.setState({
      spinner: true,
    });
    var formData = new FormData();
    formData.append("currently_work", this.state.currently_work);
    formData.append("experience_type", this.state.experience_type);
    formData.append("job_title", this.state.job_title);
    formData.append("company_name", this.state.company_name);
    formData.append("company_website", this.state.company_website);

    formData.append("city", this.state.city);
    formData.append("country", this.state.country);

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
      .then((res) => {
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
      .catch((error) => {
        console.log(error.response.data.errors);
        this.setState({
          spinner: false,
        });

        if (error.response.data) {
          if (error.response.data.errors) {
            this.setState({
              expErr: error.response.data.errors.experience_type,
              jobErr: error.response.data.errors.job_title,
              companyErr: error.response.data.errors.company_name,
              companywebErr: error.response.data.errors.company_website,
              countryErr: error.response.data.errors.country,
              cityErr: error.response.data.errors.city,
              fromErr: error.response.data.errors.from,
              toErr: error.response.data.errors.to,
            });
          }
        }
      });
  };
  handleUpdateSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var formData = new FormData();
    formData.append("currently_work", this.state.currently_work);
    formData.append("experience_type", this.state.experience_type);
    formData.append("job_title", this.state.job_title);
    formData.append("company_name", this.state.company_name);
    formData.append("company_website", this.state.company_website);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
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
      method: "post",
      url: `/A/student/profile/experience/${this.props.route.params.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.response);
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
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        if (error.response.data) {
          if (error.response.data.errors) {
            this.setState({
              expErr: error.response.data.errors.experience_type,
              jobErr: error.response.data.errors.job_title,
              companyErr: error.response.data.errors.company_name,
              companywebErr: error.response.data.errors.company_website,
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
    await axios
      .get("/countriesList")
      .then((res) => {
        this.setState({ countriesList: res.data });
        if (this.state.country !== "") {
          this.countryOnchangeHandler(this.state.country);
        }
        this.setState({
          spinner: false,
        });
      })
      .catch((err) => {
        this.setState({
          spinner: false,
        });
        console.log(err);
      });
    if (this.props.route.params.id > 0) {
      this.setState({
        spinner: true,
      });
      await axios
        .get(`/A/student/profile/experience/${this.props.route.params.id}`)
        .then((res) => {
          this.setState({
            experience_type: res.data.response.data.experience_type,
            job_title: res.data.response.data.job_title,
            company_name: res.data.response.data.company_name,
            company_website: res.data.response.data.company_website,
            country: res.data.response.data.country,
            city: res.data.response.data.city,
            from: res.data.response.data.from,
            to: res.data.response.data.to,
            cred_url: res.data.response.data.cred_url,
          });
          this.countryOnchangeHandler(this.state.country);
          this.setState({
            spinner: false,
          });
        })
        .catch((error) => {
          this.setState({
            spinner: false,
          });
        });
    }
  }
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result) {
      this.setState({ cred: result.uri });
      console.log(this.state.cred);
    }
  };
  handleDelete = async () => {
    this.setState({
      spinner: true,
    });
    await axios
      .delete(`/A/student/profile/experience/${this.props.route.params.id}`)
      .then((res) => {
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
      .catch((err) => {
        console.log(err);
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
        <Text style={styles.title}>Experience</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.labelStyle}>Experience Type</Text>
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
                onValueChange={(value) =>
                  this.setState({ experience_type: value })
                }
              >
                <Picker.Item label="Choose Your Experience Type" value="0" />
                <Picker.Item label="Internship" value="Internship" />
                <Picker.Item label="Volunteer" value="Volunteer" />
              </Picker>
            </View>
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "1%",
                marginLeft: "3%",
                marginBottom: "-4%",
              }}
            >
              {this.state.expErr ? this.state.expErr : null}
            </Text>
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
              onChangeText={(value) => this.setState({ job_title: value })}
            />
            <Text
              style={{
                color: "#F44336",
                fontSize: 14,
                textAlign: "left",
                marginTop: "-7%",
                marginLeft: "3%",
                marginBottom: "0%",
              }}
            >
              {this.state.jobErr ? this.state.jobErr : null}
            </Text>
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
                marginLeft: "-1.4%",
              }}
              value={this.state.company_name}
              onChangeText={(value) => this.setState({ company_name: value })}
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
              {this.state.companyErr ? this.state.companyErr : null}
            </Text>
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
              label="Company Website"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginLeft: "-1.4%",
              }}
              value={this.state.company_website}
              onChangeText={(value) =>
                this.setState({ company_website: value })
              }
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
              {this.state.companywebErr ? this.state.companywebErr : null}
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
                  marginLeft: "-6%",
                }}
              >
                Country
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "114%",
                  alignSelf: "flex-start",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                  marginLeft: "-6%",
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
                  marginTop: "1%",
                  marginLeft: "-5%",
                  marginBottom: "-2%",
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
                  marginTop: 5,
                  marginLeft: "-6.3%",
                }}
              >
                City
              </Text>
              <View
                style={{
                  backgroundColor: "transparent",
                  width: "114%",
                  alignSelf: "flex-start",
                  borderColor: "#1E4275",
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 2,
                  borderRadius: 0,
                  alignSelf: "flex-start",
                  marginLeft: "-6%",
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
                  marginLeft: "-5%",
                  marginBottom: "-2%",
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
                  marginLeft: "-6%",
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
                      width: "119%",
                      marginLeft: "-6.7%",
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
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "0%",
                  marginLeft: "-5%",
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
                  marginLeft: "-6%",
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
                      width: "119%",
                      marginLeft: "-6.7%",
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
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: "0%",
                  marginLeft: "-5%",
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
                  width: "125%",
                  marginLeft: "-11%",
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
                onChangeText={(value) => this.setState({ cred_url: value })}
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {this.state.cred == null ? (
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
    width: "92%",
    alignSelf: "center",
  },
  labelStyle: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginLeft: "2%",
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
