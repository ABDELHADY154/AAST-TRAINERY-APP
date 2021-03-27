import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";
export function ActivityApplieds(props) {
  const navigation = useNavigation();
  return <ActivityApplied navigation={navigation} {...props} />;
}

export default class ActivityApplied extends Component {
  render() {
    return (
      <View style={{ marginTop: "3%" }}>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
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
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitle={
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#1E4274" }}>Qowwa{"   "}</Text>
                <Text style={{ color: "#CD8930" }}>BIS</Text>
              </View>
            }
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
              this.props.navigation.navigate("InternshipShow");
            }}
          >
            <Card.Title
              style={{ marginLeft: 1 }}
              title="UI/UX Designer"
              titleStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontWeight: "bold",
              }}
              subtitle={
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#1E4274" }}>Qowwa{"   "}</Text>
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
              <Card.Cover
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 7,
                  marginLeft: 10,
                }}
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                }}
              />
              <View style={{ marginTop: -7 }}>
                <Button>
                  <Text
                    style={{
                      fontSize: 14,
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: "#1E4274",
                      // marginTop: -6,
                    }}
                  >
                    Dr. Rehab Elbadrawy
                  </Text>
                </Button>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#1E4274",
                    marginLeft: 16,
                    marginTop: -7,
                    // alignItems: "flex-end",
                    // justifyContent: "flex-end",
                  }}
                >
                  Deadline 11 oct 2020
                </Text>
              </View>
            </Card.Actions>
          </Card>
        </View>
      </View>
    );
  }
}
