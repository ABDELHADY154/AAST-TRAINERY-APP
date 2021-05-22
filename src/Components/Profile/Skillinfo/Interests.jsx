import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import TagInput from "react-native-tags-input";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";

export default class Interests extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      tag: "",
      spinner: false,
      tags: {
        tagsArray: [],
      },
      interestIdErr: "",
      interestErr: "",
    };
  }
  updateTagState = (state) => {
    this.setState({
      tags: state,
    });
  };
  async componentDidMount() {
    this.setState({
      spinner: true,
    });
    const interestArr = [];
    await axios
      .get("/A/student/profile/interest")
      .then((res) => {
        res.data.response.data.forEach((element) => {
          interestArr.push(element.interest);
        });
        this.setState({
          tags: {
            tagsArray: interestArr,
          },
        });
        this.setState({
          spinner: false,
        });
      })
      .catch((err) => {
        this.setState({
          spinner: false,
        });
        console.log(err.response);
      });
  }

  handleSubmitSkills = async () => {
    this.setState({
      spinner: true,
    });
    const data = {
      interests: [],
    };
    this.state.tags.tagsArray.forEach((el) => {
      data.interests.push({ interest: el });
    });
    await axios
      .put("/A/student/profile/interest", data)
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
        console.log(error.response.data);
        if (error.response.data) {
          this.setState({
            interestErr: error.response.data.errors.interests,
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
        <Text style={styles.title}>Interests </Text>
        <View
          style={{
            flex: 1,
            width: "95%",
            alignSelf: "center",
            marginLeft: "2%",
          }}
        >
          <ScrollView>
            <TagInput
              accessible={true}
              accessibilityLabel="Enter new a tag"
              // placeholder="Tags..."
              tagStyle={{
                backgroundColor: "#fff",
              }}
              inputContainerStyle={{
                borderColor: "#1E4275",
                borderBottomWidth: 2,
                // width: "107%",
              }}
              inputStyle={{ color: "#1E4275" }}
              label="Press Enter to add a intrest tag"
              labelStyle={{
                textTransform: "capitalize",
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
              }}
              updateState={this.updateTagState}
              tags={this.state.tags}
              // keysForTag={","}
              rightElement={
                <Icon
                  accessible={true}
                  accessibilityLabel="add new intrest tag"
                  name={"plus"}
                  type={"material-community"}
                  color="#1E4275"
                  style={{ marginRight: 5 }}
                />
              }
            />

            {this.state.interestsErr != "" ? (
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
                    textTransform: "capitalize",
                  }}
                >
                  {this.state.interestErr}
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
              <Button
                style={styles.button}
                color="#1E4275"
                onPress={this.handleSubmitSkills}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
              </Button>
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
    marginLeft: "5.9%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
