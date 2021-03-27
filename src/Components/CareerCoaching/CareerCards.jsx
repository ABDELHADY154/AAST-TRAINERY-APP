import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Card, Button, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export function CvCoach(props) {
  const navigation = useNavigation();
  return <CvCard navigation={navigation} {...props} />;
}
export function InterviewCoach(props) {
  const navigation = useNavigation();
  return <InterviewCard navigation={navigation} {...props} />;
}
export function CareerCa(props) {
  const navigation = useNavigation();
  return <CareerCard navigation={navigation} {...props} />;
}
export function Advisingcoach(props) {
  const navigation = useNavigation();
  return <AdvisingCard navigation={navigation} {...props} />;
}
export class CvCard extends Component {
  render() {
    return (
      <View>
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
            title="CV Writing Service"
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
                <Button
                  style={{
                    marginTop: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginLeft: "63%",
                    backgroundColor: "#1E4274",
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("CvWriting");
                  }}
                >
                  <Text style={{ color: "white", textTransform: "capitalize" }}>
                    book
                  </Text>
                </Button>
              </>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

export class InterviewCard extends Component {
  render() {
    return (
      <View>
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
                <Button
                  style={{
                    marginTop: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginLeft: "63%",
                    backgroundColor: "#1E4274",
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("InterviewCoaching");
                  }}
                >
                  <Text style={{ color: "white", textTransform: "capitalize" }}>
                    book
                  </Text>
                </Button>
              </>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
export class CareerCard extends Component {
  render() {
    return (
      <View>
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
            title="Make the right career move"
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
                <Button
                  style={{
                    marginTop: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginLeft: "63%",
                    backgroundColor: "#1E4274",
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("CareerCa");
                  }}
                >
                  <Text style={{ color: "white", textTransform: "capitalize" }}>
                    book
                  </Text>
                </Button>
              </>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
export class AdvisingCard extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity>
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
              title="Career Coaching & Advising Services"
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
                  <Button
                    style={{
                      marginTop: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                      marginLeft: "63%",
                      backgroundColor: "#1E4274",
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("Advising");
                    }}
                  >
                    <Text
                      style={{ color: "white", textTransform: "capitalize" }}
                    >
                      book
                    </Text>
                  </Button>
                </>
              </View>
            </Card.Actions>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
//  for bookmark
//  right={(props) => (
//      <IconButton
//        {...props}
//        icon="bookmark-outline"
//        size={30}
//        color="#1E4274"
//        onPress={() => {}}
//      />
//    )}
