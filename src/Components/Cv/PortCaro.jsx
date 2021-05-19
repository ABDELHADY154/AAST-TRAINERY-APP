import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { Button } from "galio-framework";

import { Card, Paragraph } from "react-native-paper";

export class PortCaro extends Component {
  render() {
    return (
      <View>
        <Card
          style={{
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
          }}
        >
          <Card.Content
            style={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
            }}
          >
            <Image
              // source={{ uri: 'https://picsum.photos/700' }}
              source={require("../../assets/Images/theme1.png")}
              style={{
                // marginTop: "5%",
                width: "65%",
                height: 220,
                alignSelf: "center",
              }}
            />

            <Card.Title
              style={{
                alignSelf: "center",
                textAlign: "center",
                width: "100%",
                alignContent: "center",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
              }}
              title="THEME 1"
              titleStyle={{
                margin: 0,
                alignSelf: "center",
                textAlign: "center",
                textTransform: "capitalize",
                marginLeft: "-4%",

                color: "#1E4274",
                fontSize: 18,
                fontWeight: "bold",
              }}
              subtitle="150 L.E"
              subtitleStyle={{
                textTransform: "uppercase",
                alignSelf: "center",
                textAlign: "center",
                color: "#CD8930",
                marginLeft: "-4%",

                fontSize: 16,
              }}
            />
          </Card.Content>
          <Button
            style={{
              width: "auto",
              borderRadius: 50,
            }}
            color="#1E4275"
            // onPress={this.handleSubmit}
          >
            <Text style={{ color: "white", fontSize: 18 }}>View Theme</Text>
          </Button>
          <Button
            style={{
              width: "auto",
              borderRadius: 50,
            }}
            color="#1E4275"
            // onPress={this.handleSubmit}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Purchase Theme</Text>
          </Button>
          {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions> */}
        </Card>
      </View>
    );
  }
}
