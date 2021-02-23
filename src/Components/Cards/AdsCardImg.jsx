import React, { Component } from "react";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
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

export class AdsCardImg extends Component {
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
                  Qowwa
                </Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text
                    note
                    style={{
                      color: "#CD8930",
                      fontSize: 12,
                    }}
                  >
                    BIS
                  </Text>
                </View>
              </Body>
            </Left>
            <Right></Right>
          </CardItem>
          <CardItem cardBody>
            <View
              style={{
                height: 80,
                width: "88%",
              }}
            >
              <Image
                style={{
                  height: 80,
                  width: 310,
                  marginHorizontal: 20,
                  // marginTop: 15,
                }}
                source={{
                  uri:
                    "https://www.cibeg.com/English/Personal/waystobank/PublishingImages/CIB%20-%20Digital%20Transformation%20[English%20Banner].jpg",
                }}
              />
            </View>
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
            <Left style={{ marginVertical: -15 }}>
              <Button transparent>
                <FontAwesome5 name="ad" size={24} color="#1E4274" />
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}
