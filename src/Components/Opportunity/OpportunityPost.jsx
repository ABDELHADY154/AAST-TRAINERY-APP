import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileImgLoader } from "../Loader/Loader";
import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";
import Swiper from "react-native-swiper";
import StarRating from "react-native-star-rating";
class OpportunityPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "3%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View style={{ width: "98%" }}>
            <Card.Title
              style={{ marginLeft: 1 }}
              title="UI/UX Designer"
              titleStyle={{
                color: "#1E4274",
                fontSize: 18,
                fontWeight: "bold",
              }}
              subtitle={
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#1E4274", fontSize: 16 }}>
                    Qowwa{"   "}
                  </Text>
                  <Text style={{ color: "#CD8930", fontSize: 16 }}>BIS</Text>
                </View>
              }
              subtitleStyle={{
                // color: "#1E4274",
                fontSize: 16,
                // marginTop: -3,
              }}
              left={(props) => (
                <Pressable
                  onPress={() => {
                    this.props.navigation.push("CompanyProfile", {
                      id: 10,
                    });
                  }}
                >
                  <Card.Cover
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("CompanyProfile");
                    }}
                    source={{
                      uri:
                        "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    }}
                  />
                </Pressable>
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "5%",
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: "#1E4274",
                borderWidth: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                width: 90,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#1E4274", fontSize: 16 }}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              // flex: 1,
              marginLeft: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginBottom: "3%",
              }}
            >
              Overview
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Published on:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                Oct 1, 2020
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Vacancy:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                2
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Gender:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                Any
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Type:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                Full Time
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Salary:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                Paid
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Application deadline:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                Oct 1, 2020
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "3%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#CD8930",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Location:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1E4274",
                }}
              >
                Gleem, Alexandria
              </Text>
            </View>
            <View>
              {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13646.513994923827!2d29.9491302!3d31.2310203!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x49897e2d526104e2!2zRHIuIEFiZGVsaGFkeSBFbHNoYW15IC4g2K8uINi52KjYr9in2YTZh9in2K_ZiiDYp9mE2LTYp9mF2YouINil2LPYqti02KfYsdmKINis2LHYp9it2Kkg2KfZhNiq2KzZhdmK2YQg2Ygg2KfZhNit2LHZiNmCIC4!5e0!3m2!1sen!2seg!4v1616949635625!5m2!1sen!2seg"
              width="270"
              height="100"
              // style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe> */}
            </View>
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginTop: "3%",
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#1E4274",
                marginRight: "3%",
                marginTop: "1%",
                lineHeight: 22,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu
              ac cras odio. Malesuada et massa mattis massa et sociis velit
              risus. Orci, viverra pretium, vitae risus cras diam arcu, duis a.
              Aliquet hendrerit sagittis, nisl ac tincidunt mauris quam.
              Facilisi arcu maecenas nisl, phasellus mi quis. Risus ut nulla
              elementum lectus integer dictum volutpat elementum integer. Non
              aenean in eget ornare.
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginTop: "3%",
              }}
            >
              Requirements
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="dot-single"
                size={36}
                color="#1E4274"
                style={{ marginLeft: -10 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  marginTop: "1%",
                  lineHeight: 22,
                }}
              >
                knowledge about Web, IOS, Android Design Guidelines.
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="dot-single"
                size={36}
                color="#1E4274"
                style={{ marginLeft: -10 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  marginTop: "1%",
                  lineHeight: 22,
                }}
              >
                knowledge about Web, IOS, Android Design Guidelines.
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: "7%",
                alignSelf: "flex-start",
                marginLeft: "5%",
                color: "#1E4274",
                fontSize: 20,
                fontFamily: "SF-M",
                marginBottom: 10,
              }}
            >
              Add Your Review
            </Text>
            <View
              style={{
                alignSelf: "flex-start",
                marginLeft: "5%",
                marginTop: "-2%",
                marginBottom: "5%",
              }}
            >
              <StarRating
                fullStarColor={"#CD8930"}
                starSize={22}
                disabled={false}
                maxStars={5}
                rating={this.state.rating}
                selectedStar={(value) => this.setState({ rating: value })}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
            <View
              style={{
                marginTop: "1%",
              }}
            >
              <TextInput
                style={{
                  alignSelf: "center",
                  backgroundColor: "#f2f2f2",
                  width: "93%",
                  paddingTop: "1%",
                  paddingLeft: "2%",
                  paddingRight: "3%",
                  paddingBottom: "15%",
                }}
                multiline={true}
                //   onChangeText={onChangeNumber}
                //   value={number}
                placeholder="Write Your Review..."
                placeholderTextColor="#1E4274"
                //   keyboardType="numeric"
              />
            </View>
            <View style={{ marginTop: 22, flexDirection: "row" }}>
              <TouchableOpacity
                disabled
                style={{
                  marginTop: 0,
                  justifyContent: "center",
                  alignItems: "flex-end",
                  alignSelf: "flex-end",
                  marginLeft: "73.5%",
                  backgroundColor: "#1E4274",
                  marginBottom: "15%",
                }}
                onPress={{}}
              >
                <Text
                  style={{
                    color: "white",
                    textTransform: "capitalize",
                    fontSize: 16,
                  }}
                >
                  Review
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default OpportunityPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
