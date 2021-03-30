import React, { Component } from "react";
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
import { ProfileImgLoader } from "../Loader/Loader";
import { Card, IconButton, Paragraph } from "react-native-paper";

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
                fontSize: 16,
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
              marginLeft: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginBottom: "3%",
                fontFamily: "SF-M",
              }}
            >
              Overview
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Published on:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                Oct 1, 2020
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Vacancy:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                2
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Gender:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                Any
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Type:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                Full Time
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Salary:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                Paid
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Application deadline:
              </Text>
              <Text
                style={{
                  fontSize: 16,
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
                  fontFamily: "SF-M",
                }}
              >
                Location:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                Gleem, Alexandria
              </Text>
            </View>
            <View></View>
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginTop: "3%",
                fontFamily: "SF-M",
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
                fontFamily: "SF-M",
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

          <Text
            style={{
              marginTop: "5%",
              marginLeft: "5%",
              fontFamily: "SF-M",
              fontSize: 20,
              color: "#CD8930",
              fontWeight: "bold",
            }}
          >
            Reviews
          </Text>
          <Swiper height={260} dotColor="#CCCCCC" activeDotColor="#CD8930">
            <OpportunityReview />
            <OpportunityReview />
            <OpportunityReview />
          </Swiper>

          <ReviewWrite />
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

class OpportunityReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
                textAlign: "center",
                fontSize: 15,
                color: "#1E4274",
                marginRight: "3%",
                marginTop: "1%",
                lineHeight: 22,
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
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: "15%",
            }}
          >
            <StarRating
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

class ReviewWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
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
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: "3%",
            marginTop: "5%",
            marginBottom: "5%",
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
            <Text style={{ color: "#1E4274", fontSize: 16 }}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
