import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { axios } from "../../Config/Axios";

import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";

import { RefreshControl } from "react-native";

import { useNavigation } from "@react-navigation/native";
export function ActivityAppointmentS(props) {
  const navigation = useNavigation();
  return <ActivityAppointment navigation={navigation} {...props} />;
}

export default class ActivityAppointment extends Component {
  state = {
    data: [],
    refresh: false,
  };

  onRefresh = async () => {
    await axios
      .get("/A/student/studentSessions")
      .then((res) => {
        this.setState({
          data: res.data.response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.setState({ refresh: true });
    axios
      .get("/A/student/studentSessions")
      .then((res) => {
        this.setState({
          data: res.data.response.data,
          refresh: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.data);

    return (
      <View style={{ marginTop: "3%" }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              colors={["#1E4274"]}
            />
          }
        >
          {this.state.data ? (
            this.state.data.map((data) => {
              return (
                <Card
                  // onPress={() => {
                  //   this.props.navigation.push("", {
                  //     id: this.props.item.id,
                  //   });
                  // }}
                  style={{
                    width: "93%",
                    marginLeft: "3.6%",
                    borderWidth: 1,
                    marginBottom: 10,
                    borderColor: "#CCCCCC",
                  }}
                >
                  <Card.Title
                    style={{ marginLeft: 1 }}
                    title={data.title}
                    titleStyle={{
                      color: "#1E4274",
                      fontSize: 16,
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  />
                  <Card.Content>
                    <Paragraph
                      numberOfLines={2}
                      style={{
                        fontSize: 14,
                        color: "#1E4274",
                        lineHeight: 19,
                      }}
                    >
                      {data.desc}
                    </Paragraph>
                  </Card.Content>
                  <View
                    style={{
                      backgroundColor: "#CCCCCC",
                      width: "90%",
                      height: 1,
                      marginVertical: 7,
                      // marginHorizontal: 10,
                      // alignItems: "center",
                      alignSelf: "center",
                    }}
                  ></View>
                  <Card.Actions style={{ marginTop: -3 }}>
                    <View style={{ marginTop: 0, flexDirection: "row" }}>
                      <Text
                        style={{
                          marginLeft: "3%",
                          marginTop: 7,
                          fontSize: 14,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          color: "#CD8930",
                          textTransform: "uppercase",
                        }}
                      >
                        {data.price} L.E
                      </Text>

                      <Text
                        style={{
                          alignSelf: "flex-end",
                          marginLeft: "46%",
                          color: "#1E4274",
                          textTransform: "capitalize",
                        }}
                      >
                        15 Oct 2021 | 10:00
                      </Text>
                    </View>
                  </Card.Actions>
                </Card>
              );
            })
          ) : (
            <View
              style={{
                width: "98%",
                justifyContent: "center",
                alignContent: "center",
                height: "100%",
              }}
            >
              <Image
                source={require("../../assets/Images/void.png")}
                style={{
                  marginTop: "5%",
                  width: "100%",
                  height: 420,
                  alignSelf: "center",
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
