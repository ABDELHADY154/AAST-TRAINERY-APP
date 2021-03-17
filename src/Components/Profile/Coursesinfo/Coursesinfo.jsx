import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { axios } from "../../../Config/Axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";

export default class CoursesInfoForm extends Component {
  state = {
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
    cred_url: "",
    cred: "",
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
    var formData = new FormData();

    formData.append("course_name", this.state.course_name);
    formData.append("course_provider", this.state.course_provider);
    formData.append("from", this.state.EducationFrom);
    formData.append("to", this.state.EducationTo);
    formData.append("cred_url", this.state.EducationCredURL);
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
      method: "post",
      url: "/A/student/profile/course",
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
        if (error.response.data.errors.course_name) {
          this.setState({
            course_nameErr: error.response.data.errors.course_name,
          });
        }
        if (error.response.data.errors.course_provider) {
          this.setState({
            course_providerErr: error.response.data.errors.course_provider,
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
    formData.append("course_name", this.state.course_name);
    formData.append("course_provider", this.state.course_provider);
    formData.append("from", this.state.EducationFrom);
    formData.append("to", this.state.EducationTo);
    formData.append("cred_url", this.state.EducationCredURL);
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
      method: "post",
      url: `/A/student/profile/course/${this.props.route.params.id}`,
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
        if (error.response.data.errors.course_name) {
          this.setState({
            course_nameErr: error.response.data.errors.course_name,
          });
        }
        if (error.response.data.errors.course_provider) {
          this.setState({
            course_providerErr: error.response.data.errors.course_provider,
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
    if (this.props.route.params.id > 0) {
      await axios
        .get(`/A/student/profile/course/${this.props.route.params.id}`)
        .then((res) => {
          this.setState({
            course_name: res.data.response.data.course_name,
            course_provider: res.data.response.data.course_provider,
            cred_url: res.data.response.data.cred_url,
            EducationFrom: res.data.response.data.from,
            EducationTo: res.data.response.data.to,
            cred: res.data.response.data.cred,
          });
        })
        .catch((error) => {
          if (error.response.data.errors.course_name) {
            this.setState({
              course_nameErr: error.response.data.errors.course_name,
            });
          }
          if (error.response.data.errors.course_provider) {
            this.setState({
              course_providerErr: error.response.data.errors.course_provider,
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
  handleDelete = async () => {
    await axios
      .delete(`/A/student/profile/course/${this.props.route.params.id}`)
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

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result) {
      this.setState({ cred: result.uri });
    }
  };

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

            marginTop: "35%",
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Courses</Text>

        <View style={{ width: "93%" }}>
          <ScrollView>
            <Input
              containerStyle={{
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: "5%",
              }}
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
                  marginLeft: "3%",
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
                  marginLeft: "3%",
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
                  marginLeft: "-2%",
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
                      width: "107%",
                      marginLeft: "-2%",
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
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 10,
                  marginLeft: "-2%",
                  marginBottom: -10,
                }}
              >
                To
              </Text>
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
                      width: "107%",
                      marginLeft: "-2%",
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
                  width: "114.5%",
                  marginLeft: "-6%",
                }}
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
                <Text
                  style={{
                    color: "#1E4274",
                    fontSize: 16,
                    fontFamily: "SF-M",
                    fontWeight: "normal",
                    marginBottom: 5,
                    marginLeft: "-2%",
                  }}
                >
                  Credentials Upload
                </Text>
                <Button
                  style={{
                    borderRadius: 5,
                    width: "11%",
                    height: "46%",
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

  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
