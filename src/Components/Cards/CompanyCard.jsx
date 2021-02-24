import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";

export class CompanyCard extends Component {
  render() {
    return (
      <View>
        <Card
          style={{
            width: "90%",
            marginLeft: 18,
            borderWidth: 1,
            marginBottom: 10,

            borderColor: "#CCCCCC",
          }}
        >
          <Card.Title
            style={{ marginLeft: 1 }}
            title="UI/UX Designer"
            titleStyle={{
              color: "#1E4274",
              fontSize: 18,
              fontWeight: "bold",
            }}
            subtitle="Qowwa  BIS"
            subtitleStyle={{
              color: "#1E4274",
              fontSize: 14,
              marginTop: -3,
            }}
            left={(props) => (
              <Card.Cover
                style={{ height: 45, width: 45, borderRadius: 5 }}
                source={{
                  uri:
                    "https://media-exp1.licdn.com/dms/image/C4D0BAQGIjrvGeYN4Uw/company-logo_200_200/0/1519920801777?e=2159024400&v=beta&t=io9cI7BXwBR1wGhYyoWNAfXVBez6PSqU0li8GoGUbmI",
                }}
              />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="bookmark-outline"
                size={30}
                color="#1E4274"
                onPress={() => {}}
              />
            )}
          />
          <Card.Content>
            {/* <Title>Card title</Title> */}
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
            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
          </Card.Content>
        </Card>
      </View>
    );
  }
}
