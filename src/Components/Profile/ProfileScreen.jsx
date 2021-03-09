import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  // Modal,
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

const Tab = createMaterialTopTabNavigator();

export default class ProfileScreen extends Component {
  state = {
    name: "",
    image: null,
    userData: {},
    visible: false,
  };

  async componentDidMount() {
    await axios
      .get("/A/student/studentImg")
      .then((response) => {
        this.setState({
          userData: response.data.response.data,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  }
  ExperienceTabScreen = (props) => {
    const { navigation } = useNavigation();
    const route = useRoute();
    return <ExperienceTab {...props} navigation={navigation} />;
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
    // this.props.navigation.navigate("SignIn");
  };
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={{ backgroundColor: "#1E4274" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <IconButton
              icon="menu"
              type="text"
              size={40}
              color="#fff"
              style={{
                marginRight: 110,
              }}
              onPress={() => {
                AsyncStorage.removeItem("userData");
                AsyncStorage.removeItem("userToken");
                AsyncStorage.removeItem("config");
                this.props.logout();
              }}
            />

            <Text
              style={{
                alignItems: "center",
                marginRight: 165,
                fontSize: 16,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: -15 }}>
            <View>
              <Pressable
                // style={[styles.button, styles.buttonOpen]}
                onPress={this.showModal}
              >
                <Avatar.Image
                  style={{
                    backgroundColor: "transparent",
                  }}
                  size={110}
                  // source={{ uri: this.state.image }}
                  source={{ uri: this.state.userData.image }}
                />
                <FontAwesome
                  name="camera"
                  size={20}
                  color="#1E4274"
                  style={{
                    borderRadius: 20,
                    // width: 40,
                    backgroundColor: "#fff",
                    paddingVertical: 7,
                    paddingHorizontal: 8,
                    marginTop: -30,
                    marginLeft: 74,
                  }}
                />
              </Pressable>
              <Portal>
                <Modal
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
                  {/* <View style={styles.centeredView}>
                    <View style={styles.modalView}> */}
                  <Text style={styles.modalText}>
                    Change Your Profile Picture
                  </Text>

                  <View
                    style={{
                      justifyContent: "center",
                      // alignItems: "center",
                      // alignSelf: "center",
                    }}
                  >
                    <ProfileImg />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      // onPress={}
                    >
                      <Text style={styles.textStyle}>Upload</Text>
                    </Pressable>
                  </View>

                  {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Close</Text>
                      </Pressable> */}
                  {/* </View>
                  </View> */}
                </Modal>
              </Portal>
              {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  this.setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Change Your Profile Picture
                    </Text>
                    <ProfileImg />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => this.setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal> */}
            </View>
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                marginTop: 10,
                marginBottom: 15,
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
          <Tab.Screen name="Experience" component={this.ExperienceTabScreen} />
        </Tab.Navigator>

        <StatusBar style="light" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    // paddingHorizontal: 70,
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

export function ProfileImg() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const imageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <View stye={{ alignItems: "center" }}>
        {image && (
          <Avatar.Image
            style={{
              backgroundColor: "transparent",
              // flex: 1,
              // alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
            size={80}
            source={{ uri: image }}
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
          onPress={imageFromCamera}
          style={{
            marginRight: 15,
          }}
        >
          <FontAwesome name="camera" size={30} color="#1E4274" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
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
