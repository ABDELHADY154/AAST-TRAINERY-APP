import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { axios } from "../../../Config/Axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";

export default class CoursesInfoForm extends Component {
  state = {
    spinner: false,
    course_name: "",
    course_nameErr: "",
    isFromDatePickerVisible: false,
    isToDatePickerVisible: false,
    course_provider: "",
    course_providerErr: "",
    fromErr: "",
    toErr: "",
    from: "",
    to: "",
    cred_url: null,
    cred: null,
  };

  showFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: true });
  };
  hideFromDatePicker = () => {
    this.setState({ isFromDatePickerVisible: false });
  };
  handleFromConfirm = (date) => {
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
    this.setState({ to: date.toISOString().split("T")[0] });
    this.hideToDatePicker();
  };
  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var formData = new FormData();
    formData.append("course_name", this.state.course_name);
    formData.append("course_provider", this.state.course_provider);
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
        name: `${this.state.course_name}.${fileType}`,
        type: `file/${fileType}`,
      });
    }
    await axios({
      method: "POST",
      url: "/A/student/profile/course",
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
        this.setState({
          spinner: false,
        });
        if (error.response) {
          if (error.response.data.errors) {
            this.setState({
              course_nameErr: error.response.data.errors.course_name,
              course_providerErr: error.response.data.errors.course_provider,
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
    formData.append("course_name", this.state.course_name);
    formData.append("course_provider", this.state.course_provider);
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
        name: `${this.state.course_name}.${fileType}`,
        type: `file/${fileType}`,
      });
    }
    await axios({
      method: "POST",
      url: `/A/student/profile/course/${this.props.route.params.id}`,
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
        this.setState({
          spinner: false,
        });
        if (error.response) {
          if (error.response.data.errors) {
            this.setState({
              course_nameErr: error.response.data.errors.course_name,
              course_providerErr: error.response.data.errors.course_provider,
              fromErr: error.response.data.errors.from,
              toErr: error.response.data.errors.to,
            });
          }
        }
      });
  };
  async componentDidMount() {
    if (this.props.route.params.id > 0) {
      this.setState({
        spinner: true,
      });
      await axios
        .get(`/A/student/profile/course/${this.props.route.params.id}`)
        .then((res) => {
          this.setState({
            course_name: res.data.response.data.course_name,
            course_provider: res.data.response.data.course_provider,
            cred_url: res.data.response.data.cred_url,
            from: res.data.response.data.from,
            to: res.data.response.data.to,
            cred: res.data.response.data.cred,
          });
          this.setState({
            spinner: false,
          });
        })
        .catch((error) => {
          this.setState({
            spinner: false,
          });
          console.log(error.response);
        });
    }
  }
  handleDelete = async () => {
    this.setState({
      spinner: true,
    });
    await axios
      .delete(`/A/student/profile/course/${this.props.route.params.id}`)
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

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result) {
      this.setState({ cred: result.uri });
    }
  };

  render() {
    console.log(this.state);
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
        <Text style={styles.title}>Courses</Text>

        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
          <ScrollView style={styles.scrollView}>
            <Input
              containerStyle={styles.inputContainer}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Course Name"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
                marginLeft: "0.5%",
              }}
              value={this.state.course_name}
              onChangeText={(value) => this.setState({ course_name: value })}
            />
            {this.state.course_nameErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  width: "91.5%",
                  marginLeft: "1%",
                  marginTop: "-5%",
                  marginBottom: "6%",
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.course_nameErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <Input
              containerStyle={{ flex: 1, width: "111%", alignSelf: "center" }}
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
                marginLeft: "2.5%",
                width: "99%",
              }}
              label="Course Provider"
              labelStyle={{
                marginLeft: "2.5%",
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginTop: -10,
                marginBottom: -10,
              }}
              value={this.state.course_provider}
              onChangeText={(value) =>
                this.setState({ course_provider: value })
              }
            />
            {this.state.course_providerErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  width: "91.5%",
                  marginLeft: "1%",
                  marginTop: "-5%",
                  marginBottom: "6%",
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.course_providerErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}

            <View style={{ flex: 1, width: "87%", alignSelf: "center" }}>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: -10,
                  marginLeft: "-7.5%",
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
                    onPress={this.showDatepicker}
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
                      width: "120%",
                      marginLeft: "-10%",
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
                    marginLeft: "-7%",
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                    flexDirection: "row",
                    width: "91.5%",
                    marginTop: "0%",
                    marginBottom: "5%",
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
                  marginTop: -10,
                  marginLeft: "-7.5%",
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
                    onPress={this.showDatepicker}
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
                      width: "120%",
                      marginLeft: "-10%",
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
                    marginLeft: "-7%",

                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                    flexDirection: "row",
                    width: "91.5%",
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
                  width: "114.5%",
                  marginLeft: "-6%",
                }}
                containerStyle={{ flex: 1, width: "109%", alignSelf: "center" }}
                label="Credentials URL"
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -10,
                  marginTop: 15,
                  marginLeft: "-6%",
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
    width: "106%",
    alignSelf: "center",
  },
  labelStyle: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginLeft: "3%",
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

  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
