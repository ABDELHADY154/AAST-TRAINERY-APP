import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";

export class SessionCard extends Component {
  render() {
    return (
      <View>
        <Card
          style={{
            width: "90%",
            marginLeft: 18,
            borderWidth: 1,
            borderColor: "#CCCCCC",
          }}
        >
          {/* <Button
            transparent
            onPress={() => {
              this.props.navigation.navigate("Session");
            }}
          > */}
          <CardItem>
            <Left style={{ flex: 3 }}>
              <Body>
                <Text
                  style={{
                    color: "#1E4274",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: -4,
                  }}
                >
                  Interview
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Text
              style={{
                marginHorizontal: 23,
                fontSize: 13,
                color: "#1E4274",
                lineHeight: 19,
                marginTop: -5,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
              dictumst nisi blandit ornare viverra eleifend
            </Text>
          </CardItem>
          <View
            style={{
              borderBottomColor: "#F2F2F2",
              borderBottomWidth: 1,
              marginTop: 14,
              marginHorizontal: 15,
              // width:50,
            }}
          />
          <CardItem>
            <Left>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#CD8930",
                  marginLeft: 10,
                }}
              >
                150 L.E
              </Text>
            </Left>
            <Right>
              <Button
                style={{
                  backgroundColor: "#1E4274",
                  // borderColor: "#1E4274",
                  borderRadius: 5,
                  height: 30,
                  width: 75,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Career Coaching");
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffffff",
                    textTransform: "capitalize",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  Book
                </Text>
              </Button>
            </Right>
          </CardItem>
          {/* </Button> */}
        </Card>
      </View>
    );
  }
}
