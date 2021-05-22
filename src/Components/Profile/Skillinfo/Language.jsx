import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import StarRating from "react-native-star-rating";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";

export default class Language extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      spinner: false,
      language: "",
      level: 0,
      languageIdErr: "",
      languageErr: "",
      levelErr: "",
    };
  }
  async componentDidMount() {
    if (this.props.route.params.id !== 0) {
      this.setState({
        spinner: true,
      });
      await axios
        .get(`/A/student/profile/language/${this.props.route.params.id}`)
        .then((res) => {
          this.setState({
            id: res.data.response.data.id,
            language: res.data.response.data.language,
            level: res.data.response.data.level,
          });
          this.setState({
            spinner: false,
          });
        })
        .catch((error) => {
          this.setState({
            spinner: false,
          });
          if (error.response.data) {
            this.setState({
              levelErr: error.response.data.errors.level,
              languageErr: error.response.data.errors.language,
            });
          }
        });
    }
  }

  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });
    var body = {
      language: this.state.language,
      id: this.state.id,
      level: this.state.level,
    };
    if (this.props.route.params.id !== 0) {
      return await axios
        .put(`/A/student/profile/language/${this.props.route.params.id}`, body)
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
          if (error.response.data) {
            this.setState({
              levelErr: error.response.data.errors.level,
              languageErr: error.response.data.errors.language,
            });
          }
        });
    } else {
      return await axios
        .post("/A/student/profile/language", body)
        .then((response) => {
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
            this.setState({
              levelErr: error.response.data.errors.level,
              languageErr: error.response.data.errors.language,
            });
          }
        });
    }
  };
  handleDelete = async (e) => {
    this.setState({
      spinner: true,
    });
    await axios
      .delete(`/A/student/profile/language/${this.props.route.params.id}`)
      .then((response) => {
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
          this.setState({
            levelErr: error.response.data.errors.level,
            languageErr: error.response.data.errors.language,
          });
        }
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
        <Text style={styles.title}>Language </Text>

        <View style={{ flex: 1, width: "94%", alignSelf: "center" }}>
          <ScrollView>
            <Input
              accessible={true}
              accessibilityLabel="type a language"
              containerStyle={{
                justifyContent: "center",
                alignSelf: "center",
                // marginLeft: "5%",
              }}
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
              label="Language"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
              }}
              value={this.state.language}
              onChangeText={(value) => this.setState({ language: value })}
            />
            {this.state.languageErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: -10,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                    marginLeft: "-1%",
                    textTransform: "capitalize",
                  }}
                >
                  {this.state.languageErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <View
              accessible={true}
              accessibilityLabel="Level of Experience"
              accessibilityHint="select a star from 1 to 5"
              style={{
                width: "93%",
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: "5%",
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: 10,
                  marginTop: 15,
                  marginLeft: "-3%",
                }}
              >
                Level of Experience
              </Text>
              <StarRating
                fullStarColor={"#CD8930"}
                starSize={35}
                disabled={false}
                maxStars={5}
                rating={this.state.level}
                selectedStar={(value) => this.setState({ level: value })}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginLeft: "5%",
                }}
              />
            </View>
            {this.state.levelErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "center",
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
                    marginLeft: "-1%",
                    textTransform: "capitalize",
                  }}
                >
                  {this.state.levelErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <View
              style={{
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              {this.props.route.params.id !== 0 ? (
                <View>
                  <Button
                    style={styles.button}
                    color="#1E4275"
                    onPress={this.handleSubmit}
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
                <View>
                  <Button
                    style={styles.button}
                    color="#1E4275"
                    onPress={this.handleSubmit}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
                  </Button>
                </View>
              )}
            </View>
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
    paddingRight: 15,
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "5.4%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
    justifyContent: "center",
  },
});
