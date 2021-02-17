import React, { Component } from "react";
import { View } from "react-native";
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
import { FontAwesome } from "@expo/vector-icons";
export class PromotedCard extends Component {
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
          <CardItem>
            <Left style={{ flex: 3 }}>
              <Thumbnail
                style={{ height: 45, width: 45 }}
                source={{
                  uri:
                    "https://media-exp1.licdn.com/dms/image/C4D0BAQGIjrvGeYN4Uw/company-logo_200_200/0/1519920801777?e=2159024400&v=beta&t=io9cI7BXwBR1wGhYyoWNAfXVBez6PSqU0li8GoGUbmI",
                }}
              />
              <Body>
                <Text
                  style={{
                    color: "#1E4274",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  UI/UX Designer
                </Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text
                    note
                    style={{
                      color: "#1E4274",
                      fontSize: 14,
                    }}
                  >
                    Qowwa
                  </Text>
                  <Text
                    note
                    style={{
                      color: "#CD8930",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    BIS
                  </Text>
                </View>
              </Body>
            </Left>
            <Right>
              <FontAwesome name="bookmark-o" size={30} color="#1E4274" />
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Text
              style={{
                marginHorizontal: 23,
                fontSize: 13,
                color: "#1E4274",
                lineHeight: 19,
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
            <Left style={{ marginVertical: -10 }}>
              <Button transparent>
                <Feather name="arrow-up-right" size={30} color="#1E4274" />
                <Text
                  style={{
                    fontSize: 16,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#1E4274",
                    marginLeft: -10,
                  }}
                >
                  Promoted
                </Text>
              </Button>
            </Left>
            <Right>
              <Text style={{ fontSize: 12, color: "#1E4274" }}>
                Deadline 11 oct 2020
              </Text>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}
