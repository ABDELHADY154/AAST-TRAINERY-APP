import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { axios } from "../../../Config/Axios";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";

export default class AccountInfoForm extends Component {
  state = {
    website: null,
    webErr: "",
    spinner: true,
    facebookErr: "",
    instagramErr: "",
    youtubeErr: "",
    linkedinErr: "",
    behanceErr: "",
    githubErr: "",
    facebook: null,
    instagram: null,
    youtube: null,
    linkedin: null,
    behance: null,
    github: null,
  };

  handleSubmit = async () => {
    this.setState({
      spinner: true,
    });

    const data = {};
    if (this.state.website !== null && this.state.website !== "") {
      data["website"] = this.state.website;
    }
    if (this.state.facebook !== null && this.state.facebook !== "") {
      data["facebook"] = this.state.facebook;
    }
    if (this.state.instagram !== null && this.state.instagram !== "") {
      data["instagram"] = this.state.instagram;
    }
    if (this.state.youtube !== null && this.state.youtube !== "") {
      data["youtube"] = this.state.youtube;
    }
    if (this.state.linkedin !== null && this.state.linkedin !== "") {
      data["linkedin"] = this.state.linkedin;
    }
    if (this.state.behance !== null && this.state.behance !== "") {
      data["behance"] = this.state.behance;
    }
    if (this.state.github !== null && this.state.github !== "") {
      data["github"] = this.state.github;
    }
    await axios
      .post("/A/student/profile/account", data)
      .then(res => {
        this.setState({
          spinner: false,
        });
        this.props.navigation.push("App", {
          screen: "Profile",
        });
      })
      .catch(error => {
        this.setState({
          spinner: false,
        });
        if (error.response.data) {
          if (error.response.data.errors) {
            this.setState({
              webErr: error.response.data.errors.website,
              instagramErr: error.response.data.errors.instagram,
              facebookErr: error.response.data.errors.facebook,
              youtubeErr: error.response.data.errors.youtube,
              linkedinErr: error.response.data.errors.linkedin,
              githubErr: error.response.data.errors.github,
              behanceErr: error.response.data.errors.behance,
            });
          }
        }
      });
  };
  async componentDidMount() {
    await axios
      .get("/A/student/profile/account")
      .then(res => {
        this.setState({
          website: res.data.response.data[0].website,
          facebook: res.data.response.data[0].facebook,
          instagram: res.data.response.data[0].instagram,
          youtube: res.data.response.data[0].youtube,
          linkedin: res.data.response.data[0].linkedin,
          behance: res.data.response.data[0].behance,
          github: res.data.response.data[0].github,
        });
        this.setState({
          spinner: false,
        });
      })
      .catch(err => {
        this.setState({
          spinner: false,
        });
        console.log(err);
      });
  }

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
        <Text style={styles.title}>Accounts</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Website"
              labelStyle={styles.labelStyle}
              value={this.state.website}
              // errorMessage={this.state.webErr}
              onChangeText={value => this.setState({ website: value })}
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
              {this.state.webErr ? this.state.webErr : null}
            </Text>
            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Facebook"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginTop: -10,
                marginBottom: -10,
              }}
              // errorMessage={this.state.facebookErr}
              value={this.state.facebook}
              onChangeText={value => this.setState({ facebook: value })}
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
              {this.state.facebookErr ? this.state.facebookErr : null}
            </Text>
            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Instagram"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: -10,
              }}
              value={this.state.instagram}
              // errorMessage={this.state.instagramErr}
              onChangeText={value => this.setState({ instagram: value })}
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
              {this.state.instagramErr ? this.state.instagramErr : null}
            </Text>
            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Youtube"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: -10,
              }}
              value={this.state.youtube}
              // errorMessage={this.state.youtubeErr}
              onChangeText={value => this.setState({ youtube: value })}
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
              {this.state.youtubeErr ? this.state.youtubeErr : null}
            </Text>
            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="LinkedIn"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: -10,
              }}
              value={this.state.linkedin}
              // errorMessage={this.state.linkedinErr}
              onChangeText={value => this.setState({ linkedin: value })}
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
              {this.state.linkedinErr ? this.state.linkedinErr : null}
            </Text>

            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Behance"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: -10,
              }}
              value={this.state.behance}
              // errorMessage={this.state.behanceErr}
              onChangeText={value => this.setState({ behance: value })}
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
              {this.state.behanceErr ? this.state.behanceErr : null}
            </Text>
            <Input
              style={styles.input}
              autoCompleteType="off"
              textContentType="name"
              keyboardType="url"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Github"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: -10,
              }}
              value={this.state.github}
              // errorMessage={this.state.githubErr}
              onChangeText={value => this.setState({ github: value })}
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
              {this.state.githubErr ? this.state.githubErr : null}
            </Text>
            <Button
              style={styles.button}
              color="#1E4275"
              onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Confirm</Text>
            </Button>
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
    marginLeft: "5.6%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "94%",
    // alignSelf: "center",
    // marginLeft: "-0.5%",
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
    marginLeft: 10,
  },
  boxContainer: {
    backgroundColor: "transparent",
    width: 360,
    marginLeft: 10,
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
