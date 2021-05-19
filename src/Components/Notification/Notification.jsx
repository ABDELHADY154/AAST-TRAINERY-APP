import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import { Image } from "react-native-elements";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { axios } from "../../Config/Axios";
import Spinner from "react-native-loading-spinner-overlay";
import { RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Notification extends Component {
  state = {
    notifications: [],
    loading: true,
    refresh: false,
  };
  async componentDidMount() {
    await axios
      .get("/A/student/notifications")
      .then(res => {
        this.setState({
          loading: false,
          notifications: res.data.response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onRefresh = async () => {
    this.setState({
      refresh: true,
    });
    await axios
      .get("/A/student/notifications")
      .then(res => {
        this.setState({
          loading: false,
          notifications: res.data.response.data,
          refresh: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
    // this.setState
  };
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          cancelable={false}
          size="large"
          color="#1E4274"
          animation="fade"
          overlayColor="rgba(255, 255, 255, 0.8)"
          textStyle={{ color: "#1E4274", textAlign: "center" }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              colors={["#1E4274"]}
            />
          }
        >
          <View style={{ marginVertical: 10 }}>
            {this.state.notifications.length !== 0 ? (
              this.state.notifications.map(e => {
                if (e.category == "rejected") {
                  return (
                    <RejectCard
                      key={e.id}
                      data={e}
                      navigation={this.props.navigation}
                    />
                  );
                } else if (e.category == "success") {
                  return (
                    <AcceptedCard
                      key={e.id}
                      data={e}
                      navigation={this.props.navigation}
                    />
                  );
                } else if (e.category == "important") {
                  return (
                    <ImportantCard
                      key={e.id}
                      data={e}
                      navigation={this.props.navigation}
                    />
                  );
                }
              })
            ) : (
              <View
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/Images/Notifications.png")}
                  style={{ width: 250, height: 250, marginTop: 100 }}
                />
              </View>
            )}

            {/* <View
              style={{
                width: "99%",
                // height: 50,
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#007BC2",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Feather
                  name="alert-circle"
                  size={24}
                  color="#007BC2"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    Review your finished session{" "}
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information{" "}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "99%",
                // height: 50,
                marginBottom: 15,
                borderRadius: 3,
                backgroundColor: "#fff",
                borderLeftColor: "#007BC2",
                borderLeftWidth: 5,
                borderLeftRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Feather
                  name="alert-circle"
                  size={24}
                  color="#007BC2"
                  style={{ marginHorizontal: 10 }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    You have a recomendation to apply for an internship
                  </Text>
                  <Text style={{ color: "#B1B0B0" }}>
                    Tap for more information
                  </Text>
                </View>
              </View>
            </View>
             */}

            {/* booked session notification */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

class RejectCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.999999999}
        underlayColor="#DDDDDD"
        onPress={() =>
          this.props.data.type == "internship"
            ? this.props.navigation.push("OpportunityPost", {
                id: this.props.data.internship.id,
              })
            : this.props.navigation.push("Advising", {
                id: this.props.data.session.id,
              })
        }
      >
        <View
          style={{
            width: "99%",
            marginBottom: 15,
            borderRadius: 3,
            backgroundColor: "#fff",
            borderLeftColor: "#F44336",
            borderLeftWidth: 5,
            borderLeftRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Feather
              name="x-octagon"
              size={24}
              color="#F44336"
              style={{ marginHorizontal: 10 }}
            />
            <View style={{ width: "80%" }}>
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                {this.props.data.type == "internship"
                  ? this.props.data.internship.title
                  : this.props.data.session.title}{" "}
              </Text>
              <Text style={{ color: "#1E4274", fontSize: 13 }}>
                {this.props.data.message}{" "}
              </Text>
              <Text style={{ color: "#B1B0B0" }}>
                Tap for more information{" "}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class AcceptedCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.999999999}
        underlayColor="#DDDDDD"
        onPress={() =>
          this.props.data.type == "internship"
            ? this.props.navigation.push("OpportunityPost", {
                id: this.props.data.internship.id,
              })
            : this.props.navigation.push("Advising", {
                id: this.props.data.session.id,
              })
        }
      >
        <View
          style={{
            width: "99%",
            // height: 50,
            marginBottom: 15,
            borderRadius: 3,
            backgroundColor: "#fff",
            borderLeftColor: "#4CAF50",
            borderLeftWidth: 5,
            borderLeftRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <AntDesign
              name="checkcircleo"
              size={24}
              color="#4CAF50"
              style={{ marginHorizontal: 10 }}
            />
            <View style={{ width: "80%" }}>
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                {this.props.data.type == "internship"
                  ? this.props.data.internship.title
                  : this.props.data.session.title}{" "}
              </Text>
              <Text style={{ color: "#1E4274", fontSize: 13 }}>
                {this.props.data.message}{" "}
              </Text>
              <Text style={{ color: "#B1B0B0" }}>Tap for more information</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class ImportantCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.999999999}
        underlayColor="#DDDDDD"
        onPress={() =>
          this.props.data.type == "internship"
            ? this.props.navigation.push("OpportunityPost", {
                id: this.props.data.internship.id,
              })
            : this.props.navigation.push("Advising", {
                id: this.props.data.session.id,
              })
        }
      >
        <View
          style={{
            width: "99%",
            // height: 50,
            marginBottom: 15,
            borderRadius: 3,
            backgroundColor: "#fff",
            borderLeftColor: "#007BC2",
            borderLeftWidth: 5,
            borderLeftRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Feather
              name="alert-circle"
              size={24}
              color="#007BC2"
              style={{ marginHorizontal: 10 }}
            />
            <View style={{ width: "80%" }}>
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                {this.props.data.type == "internship"
                  ? this.props.data.internship.title
                  : this.props.data.session.title}{" "}
              </Text>
              <Text style={{ color: "#1E4274", fontSize: 13 }}>
                {this.props.data.message}{" "}
              </Text>
              <Text style={{ color: "#B1B0B0" }}>
                Tap for more information{" "}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
