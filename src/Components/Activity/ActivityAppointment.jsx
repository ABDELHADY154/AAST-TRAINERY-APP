import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export function ActivityAppointmentS(props) {
  const navigation = useNavigation();
  return <ActivityAppointment navigation={navigation} {...props} />;
}

export default class ActivityAppointment extends Component {
  render() {
    return (
      <View style={{ marginTop: "3%" }}>
        <Card
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
            title="Interview coaching"
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          />
          <Card.Content>
            <Paragraph
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
              dictumst nisi blandit ornare viverra eleifend
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
              <>
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
                  {/* {this.state.price} */}
                  150 L.E
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
              </>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
