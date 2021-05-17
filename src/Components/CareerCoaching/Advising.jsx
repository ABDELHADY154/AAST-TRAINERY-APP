import { useNavigation } from "@react-navigation/native";
// import { axios } from "../../Config/Axios";
import { axios } from "../../Config/Axios";

import { Feather } from "@expo/vector-icons";
import img from "../../assets/Images/cvpic.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import Swiper from "react-native-swiper";

import StarRating from "react-native-star-rating";

import { Card, Paragraph } from "react-native-paper";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Alert,
  Linking,
} from "react-native";
import React, { Component, useState, useEffect, useRef } from "react";

export default class Advising extends Component {
  state = {
    status: "",
    isDatePickerVisible: false,
    Date: "2021-1-9",
    Time: "11:11",
    data: {},
    title: "",
    desc: "",
    price: "",
    image: "",
    booking_date: "",
    id: 0,
    review: [],
    session_type: "",
    comment: "",
    fullName: "",
    rate: 0,
    reviewed: null,
  };
  review = async () => {
    const data = {
      session_type: this.state.session_type,
      comment: this.state.comment,
      fullName: this.state.fullName,
      rate: this.state.rate,
    };
    axios
      .post(`/A/student/sessionReview/${this.state.data.id}`, data)

      .then(() => {
        this.setState({
          reviewed: true,
        });
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };

  book = async () => {
    const data = {
      booking_date: this.state.booking_date,
      status: "booked",
    };
    axios
      .post(`/A/bookSession/${this.state.data.id}`, data)

      .then(() => {
        // console.log(this.state.booking_date);
        this.setState({
          status: "booked",
          booking_date: this.state.booking_date,
        });
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };
  unbook = async () => {
    const data = {
      // booking_date: this.state.booking_date,
      id: this.state.id,
      status: "unbooked",
    };
    axios
      .post(`/A/bookSession/cancelBooking/${this.state.data.id}`, data)

      .then(() => {
        console.log(this.state.booking_date);
        this.setState({
          status: "unbooked",
        });
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleConfirm = (date) => {
    this.setState({
      Date: date.toISOString().split("T")[0],
      Time: date.toLocaleTimeString().replace(/:\d{2}\s/, " "),
      booking_date:
        date.toISOString().split("T")[0] +
        " " +
        date.toLocaleTimeString().replace(/:\d{2}\s/, " "),
    });

    this.hideDatePicker();
  };
  componentDidMount() {
    axios
      .get(`/A/session/${this.props.route.params.id}`)

      .then((res) => {
        this.setState({
          status: res.data.response.data.status,
          data: res.data.response.data,
          id: res.data.response.data.id,
          title: res.data.response.data.title,
          desc: res.data.response.data.desc,
          price: res.data.response.data.price,
          image: res.data.response.data.image,
          reviewed: res.data.response.data.reviewed,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`/A/student/sessionReview/${this.props.route.params.id}`)

      .then((res) => {
        this.setState({
          session_type: res.data.response.data.session_type,
          review: res.data.response.data,
          comment: res.data.response.data.comment,
          fullName: res.data.response.data.fullName,
          rate: res.data.response.data.rate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.status);
    console.log(this.state.reviewed);
    return (
      <View style={styles.container}>
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

        {this.state.id !== 0 ? (
          <>
            <Text style={styles.title}>{this.state.title}</Text>
            <ScrollView>
              <Image
                source={{ uri: this.state.image }}
                style={{
                  height: 200,
                  width: "93%",
                  alignSelf: "center",
                  borderRadius: 5,
                }}
              />
              <Text
                style={{
                  color: "#1E4274",
                  width: "92%",
                  marginTop: "5%",
                  lineHeight: 19,

                  alignSelf: "center",
                }}
              >
                {this.state.desc}
              </Text>
              {this.state.status == "unbooked" ? (
                <>
                  <View style={{ flexDirection: "row", marginTop: "6%" }}>
                    <DateTimePickerModal
                      isVisible={this.state.isDatePickerVisible}
                      mode="datetime"
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                    />
                    <Feather
                      onPress={this.showDatePicker}
                      name="calendar"
                      size={22}
                      color="#1E4274"
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: "4.6%",
                        marginTop: "1%",
                        marginRight: "2%",
                      }}
                    ></Feather>
                    <Button
                      onPress={this.showDatePicker}
                      color="#1E4274"
                      style={{
                        width: "35%",
                        alignContent: "center",
                        justifyContent: "center",
                        borderColor: "#1E4274",
                        borderWidth: 2,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderRadius: 10,
                        height: 35,
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color: "#1E4274",
                        }}
                      >
                        {this.state.Date}
                      </Text>
                    </Button>
                    <Button
                      onPress={this.showDatePicker}
                      color="#1E4274"
                      style={{
                        alignSelf: "center",
                        width: "25%",
                        marginLeft: "-2%",
                        alignContent: "center",
                        justifyContent: "center",
                        borderColor: "#1E4274",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeftWidth: 0,
                        borderWidth: 2,
                        borderRadius: 10,
                        height: 35,
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color: "#1E4274",
                        }}
                      >
                        {this.state.Time}
                      </Text>
                    </Button>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#1e4274",
                        marginLeft: "5%",
                        // textAlign: "center",
                        marginTop: "3%",
                      }}
                    >
                      (please choose suitable timings for your session)
                    </Text>
                  </View>

                  <View style={{ marginTop: 22, flexDirection: "row" }}>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: "5%",
                        marginTop: 10,
                        fontSize: 14,
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        color: "#CD8930",
                        textTransform: "uppercase",
                      }}
                    >
                      {this.state.price} L.E
                    </Text>
                    <Button
                      style={{
                        marginTop: 0,
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                        alignSelf: "flex-end",
                        // if you have a solution for this please let me know, its working only on margin
                        marginLeft: "60%",
                        backgroundColor: "#1E4274",
                      }}
                      onPress={this.book}
                    >
                      <Text
                        style={{ color: "white", textTransform: "capitalize" }}
                      >
                        book
                      </Text>
                    </Button>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ marginTop: "14%" }}></View>
                  <View style={{ marginTop: 22, flexDirection: "row" }}>
                    <>
                      <Text
                        style={{
                          marginLeft: "5%",
                          marginTop: 10,
                          fontSize: 14,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          color: "#CD8930",
                          textTransform: "uppercase",
                        }}
                      >
                        {this.state.price} L.E
                        {/* 150 L.E */}
                      </Text>
                      <Button
                        style={{
                          marginTop: 0,
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "flex-end",
                          marginLeft: "56%",
                          backgroundColor: "#f2f2f2",
                        }}
                        onPress={this.unbook}
                      >
                        <Text
                          style={{
                            color: "#1E4274",
                            textTransform: "capitalize",
                          }}
                        >
                          Booked
                        </Text>
                      </Button>
                    </>
                  </View>
                </>
              )}
              {this.state.reviewed == false ? (
                <>
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
                      onChange={(rate) => {
                        this.setState({ rate: rate });
                      }}
                      fullStarColor={"#CD8930"}
                      starSize={22}
                      disabled={false}
                      maxStars={5}
                      rating={this.state.rate}
                      selectedStar={(rate) => this.setState({ rate: rate })}
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
                      placeholder="Write Your Review..."
                      placeholderTextColor="#1E4274"
                      value={this.state.comment}
                      onChangeText={(value) =>
                        this.setState({ comment: value })
                      }
                    />
                  </View>
                  <View style={{ marginTop: 22, flexDirection: "row" }}>
                    <>
                      <Button
                        style={{
                          marginTop: 0,
                          justifyContent: "center",
                          alignItems: "flex-end",
                          alignSelf: "flex-end",
                          marginLeft: "73.5%",
                          backgroundColor: "#1E4274",
                          marginBottom: "15%",
                        }}
                        onPress={this.review}
                      >
                        <Text
                          style={{
                            color: "white",
                            textTransform: "capitalize",
                          }}
                        >
                          Review
                        </Text>
                      </Button>
                    </>
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      marginTop: "7%",
                      alignSelf: "flex-start",
                      marginLeft: "5%",
                      color: "#CD8930",
                      fontSize: 20,
                      fontFamily: "SF-M",
                      marginBottom: 10,
                    }}
                  >
                    Reviews
                  </Text>
                  <Swiper
                    height={260}
                    dotColor="#CCCCCC"
                    activeDotColor="#CD8930"
                  >
                    {this.state.review.map((review) => {
                      return (
                        <>
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
                                {review.comment}
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
                                  title={review.fullName}
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
                                  subtitle={review.session_type}
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
                                rating={review.rate}
                              />
                            </View>
                          </Card>
                        </>
                      );
                    })}
                  </Swiper>
                </>
              )}
            </ScrollView>
          </>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "5.4%",
    color: "#1E4274",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },
});
