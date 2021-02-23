import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
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

export class AdvisorCard extends Component {
  render() {
    return (
      <View>
        <Card
          // transparent
          // bordered
          style={{
            width: "90%",
            marginLeft: 18,
            borderWidth: 1,
            borderColor: "#CCCCCC",
            borderRadius: 2,
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
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate("AdvisorProfile");
                }}
              >
                <Thumbnail
                  source={{
                    uri:
                      "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  }}
                  style={{ height: 35, width: 35, borderRadius: 7 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#1E4274",
                    marginLeft: -10,
                  }}
                >
                  Dr. Rehab Elbadrawy
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
