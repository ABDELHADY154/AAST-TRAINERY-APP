import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { axios } from "../../../Config/Axios";
import { StatusBar } from "expo-status-bar";

export default class AccountInfoForm extends Component {
  state = {
    website: "",
    webErr: "",
    facebookErr: "",
    instagramErr: "",
    youtubeErr: "",
    linkedinErr: "",
    behanceErr: "",
    githubErr: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    behance: "",
    github: "",
  };

  handleSubmit = async () => {
    const data = {
      website: this.state.website,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      behance: this.state.behance,
      github: this.state.github,
    };
    await axios
      .post("/A/student/profile/account", data)
      .then((res) => {
        this.props.navigation.push("App", {
          screen: "Profile",
        });
      })
      .catch((error) => {
        // console.log(error.response.data);
        if (error.response.data.errors.website) {
          this.setState({
            webErr: error.response.data.errors.website,
          });
        }
        if (error.response.data.errors.instagram) {
          this.setState({
            instagramErr: error.response.data.errors.instagram,
          });
        }
        if (error.response.data.errors.facebook) {
          this.setState({
            facebookErr: error.response.data.errors.facebook,
          });
        }
        if (error.response.data.errors.youtube) {
          this.setState({
            youtubeErr: error.response.data.errors.youtube,
          });
        }
        if (error.response.data.errors.linkedin) {
          this.setState({
            linkedinErr: error.response.data.errors.linkedin,
          });
        }
        if (error.response.data.errors.github) {
          this.setState({
            githubErr: error.response.data.errors.github,
          });
        }
        if (error.response.data.errors.behance) {
          this.setState({
            behanceErr: error.response.data.errors.behance,
          });
        }
      });
  };
  async componentDidMount() {
    await axios
      .get("/A/student/profile/account")
      .then((res) => {
        this.setState({
          website: res.data.response.data[0].website,
          facebook: res.data.response.data[0].facebook,
          instagram: res.data.response.data[0].instagram,
          youtube: res.data.response.data[0].youtube,
          linkedin: res.data.response.data[0].linkedin,
          behance: res.data.response.data[0].behance,
          github: res.data.response.data[0].github,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
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
        <Text style={styles.title}>Accounts</Text>

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
              }}
              label="Website"
              labelStyle={styles.labelStyle}
              value={this.state.website}
              // errorMessage={this.state.webErr}
              onChangeText={(value) => this.setState({ website: value })}
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
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
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
              onChangeText={(value) => this.setState({ facebook: value })}
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
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
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
              onChangeText={(value) => this.setState({ instagram: value })}
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
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
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
              onChangeText={(value) => this.setState({ youtube: value })}
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
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
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
              onChangeText={(value) => this.setState({ linkedin: value })}
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
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
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
              onChangeText={(value) => this.setState({ behance: value })}
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
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
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
              onChangeText={(value) => this.setState({ github: value })}
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
