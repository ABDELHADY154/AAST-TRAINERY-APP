import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import StarRating from "react-native-star-rating";

import { Card, Paragraph } from "react-native-paper";

export class ReviewsCard extends Component {
  state = {
    rating: 2,
  };
  render() {
    return (
      <View>
        <Card
          style={{
            marginBottom: 10,
          }}
        >
          <Card.Content>
            <Paragraph
              style={{
                fontSize: 14,

                textAlign: "center",
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </Paragraph>
            <View
              style={{
                borderBottomColor: "#CD8930",
                borderBottomWidth: 2,
                width: "45%",
                alignSelf: "center",
                // marginLeft: "3.5%",
                marginTop: "3%",
              }}
            />
            <View style={{ width: "100%" }}>
              <Card.Title
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  width: "100%",
                  alignContent: "center",
                }}
                title="Yasmin Sabry"
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
                subtitle="Cv Writing"
                subtitleStyle={{
                  textTransform: "capitalize",
                  alignSelf: "center",
                  textAlign: "center",
                  color: "#1E4274",
                  marginLeft: "-4%",

                  fontSize: 14,
                }}
              />
            </View>
          </Card.Content>
          <View
            style={{
              flexDirection: "row",
              //   marginLeft: "3%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: "15%",
            }}
          >
            <StarRating
              //   style={{ paddingRight: "50%" }}
              fullStarColor={"#CD8930"}
              starSize={22}
              disabled={false}
              maxStars={5}
              rating={this.state.rating}
            />
          </View>
        </Card>
      </View>
    );
  }
}
