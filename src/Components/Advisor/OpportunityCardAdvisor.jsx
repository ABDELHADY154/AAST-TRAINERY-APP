import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";

export class OpportunityCardAdvisor extends Component {
  render() {
    return (
      <View>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#CCCCCC",
          }}
          onPress={() => {
            this.props.navigation.navigate("CompanyProfile");
          }}
        >
          <Card.Title
            style={{ marginLeft: 1 }}
            title="Qowwa"
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitle={
              <View style={{ flexDirection: "row" }}>
                {/* <Text style={{ color: "#1E4274" }}>Qowwa{"   "}</Text> */}
                <Text style={{ color: "#CD8930" }}>BIS</Text>
              </View>
            }
            subtitleStyle={{
              // color: "#1E4274",
              fontSize: 14,
              marginTop: -3,
            }}
            left={(props) => (
              <Card.Cover
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 5,
                }}
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
            <Text
              style={{
                fontSize: 12,
                color: "#1E4274",
                marginLeft: 12,
                // marginTop: -7,
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              Deadline 11 oct 2020
            </Text>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
