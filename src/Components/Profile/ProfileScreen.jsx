import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Avatar, IconButton, Modal, Portal } from "react-native-paper";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ExperienceTab } from "./ExperienceTab";
import { PersonalTab } from "./PersonalTab";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileImgLoader } from "../Loader/Loader";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "galio-framework";

const Tab = createMaterialTopTabNavigator();

export default class ProfileScreen extends Component {
  state = {
    name: "",
    image: null,
    userData: {},
    visible: false,
    loading: false,
    spinner: false,
  };

  afterImageUpload = async () => {
    await axios
      .get("/A/student/studentImg")
      .then(response => {
        this.setState({
          userData: response.data.response.data,
        });
        this.props.getUserData(this.state.userData);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  };
  async componentDidMount() {
    await axios
      .get("/A/student/studentImg")
      .then(response => {
        this.setState({
          loading: true,
          userData: response.data.response.data,
        });
        this.props.getUserData(this.state.userData);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  }
  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
  };
  getImage = image => {
    this.setState({ image: image });
  };
  updateImage = async () => {
    this.setState({
      spinner: true,
    });
    var formData = new FormData();
    let uriParts = this.state.image.split(".");
    let fileType = uriParts[uriParts.length - 1];
    formData.append("image", {
      uri: this.state.image,
      name: `${this.state.title}.${fileType}`,
      type: `image/${fileType}`,
    });

    await axios({
      method: "post",
      url: "/A/student/profile/image",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(e => {
        this.setState({ visible: false });
        this.afterImageUpload();
        this.setState({
          spinner: false,
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
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
        <View style={{ backgroundColor: "#1E4274" }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {this.state.loading === false ? (
              <View
                accessible={true}
                accessibilityLabel="profile picture loader"
                accessibilityHint="profile picture"
              >
                <ProfileImgLoader />
              </View>
            ) : (
              <View style={{ marginTop: 20 }}>
                <Pressable
                  onPress={this.showModal}
                  accessible={true}
                  accessibilityLabel="upload profile picture"
                  accessibilityHint="choose picture from gallary or use camera"
                >
                  <Avatar.Image
                    style={{
                      backgroundColor: "transparent",
                    }}
                    size={110}
                    source={{ uri: this.state.userData.image }}
                  />
                  {/* <FontAwesome
                    accessible={true}
                    accessibil
                    name="camera"
                    size={20}
                    color="#1E4274"
                    style={{
                      borderRadius: 20,
                      backgroundColor: "#fff",
                      paddingVertical: 7,
                      paddingHorizontal: 8,
                      marginTop: -30,
                      marginLeft: 74,
                    }}
                  /> */}
                  <Button
                    onlyIcon
                    accessible={true}
                    icon="camera"
                    iconFamily="antdesign"
                    iconSize={30}
                    color="#fff"
                    iconColor="#1E4274"
                    onPress={this.showModal}
                    style={{
                      width: 45,
                      height: 45,
                      paddingVertical: 7,
                      paddingHorizontal: 8,
                      marginTop: -30,
                      marginLeft: 74,
                    }}
                  >
                    warning
                  </Button>
                </Pressable>
                <Portal>
                  <Modal
                    accessible={true}
                    accessibilityLabel="Change Your Profile Picture"
                    visible={this.state.visible}
                    onDismiss={this.hideModal}
                    contentContainerStyle={{
                      backgroundColor: "white",
                      padding: 20,
                      width: 294,
                      height: 280,
                      alignSelf: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.modalText}>
                      Change Your Profile Picture
                    </Text>

                    <View
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <ProfileImg image={this.getImage} />
                      <Pressable style={[styles.button, styles.buttonClose]}>
                        <Text
                          style={styles.textStyle}
                          onPress={this.updateImage}
                        >
                          Upload
                        </Text>
                      </Pressable>
                    </View>
                  </Modal>
                </Portal>
              </View>
            )}

            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                marginTop: 10,
                marginBottom: 15,
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {this.state.userData.fullName}
            </Text>
          </View>
        </View>
        {/* Tabs */}
        <Tab.Navigator
          backBehavior="none"
          tabBarOptions={{
            activeTintColor: "#CD8930",
            inactiveTintColor: "#1E4274",
            indicatorStyle: { backgroundColor: "#CD8930" },
            labelStyle: { fontSize: 14 },
            style: { backgroundColor: "#fff" },
          }}
        >
          <Tab.Screen name="Personal Info" component={PersonalTab} />
          <Tab.Screen name="Experience" component={ExperienceTab} />
        </Tab.Navigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  button: {
    borderRadius: 13,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: "#1E4274",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: "center",
    color: "#1E4274",
  },
});

export class ProfileImg extends Component {
  state = {
    image: null,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.image(result.uri);
    }
  };

  imageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.image(result.uri);
    }
  };

  render() {
    return (
      <View style={{ marginBottom: 15 }}>
        <View stye={{ alignItems: "center" }}>
          {this.state.image && (
            <Avatar.Image
              style={{
                backgroundColor: "transparent",
                alignSelf: "center",
                justifyContent: "center",
              }}
              size={80}
              source={{ uri: this.state.image }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={this.imageFromCamera}
            style={{
              marginRight: 15,
            }}
          >
            <FontAwesome name="camera" size={30} color="#1E4274" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.pickImage}
            style={{
              marginLeft: 15,
            }}
          >
            <Entypo name="images" size={30} color="#1E4274" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
