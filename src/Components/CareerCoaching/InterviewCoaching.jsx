import { useNavigation } from "@react-navigation/native";
// import { axios } from "../../Config/Axios";
import { Feather } from "@expo/vector-icons";
import img from "../../assets/Images/cvpic.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import Swiper from "react-native-swiper";
import StarRating from "react-native-star-rating";
import { ReviewsCard } from "./ReviewsCoaching";
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

export default class InterviewCoaching extends Component {
  state = {
    isBooked: false,
    isDatePickerVisible: false,
    Date: "2021-1-9",
    Time: "11:11",
  };
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleConfirm = (date) => {
    this.setState({ Date: date.toISOString().split("T")[0] });
    this.setState({
      Time: date.toLocaleTimeString().replace(/:\d{2}\s/, " "),
    });
    console.log(this.state.Time);

    this.hideDatePicker();
  };
  render() {
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
        <Text style={styles.title}>Interview Coaching</Text>
        <ScrollView>
          <Image
            source={img}
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
              //   marginLeft: "5.4%",
              alignSelf: "center",
            }}
          >
            Our career coaches will help you overcome your interview fears and
            refine your answers, to enhance your chances of getting the job. you
            will understand your strengths and blind spots in interviews through
            a personality assessment, Practice and rehearse your answers to your
            most challenging interview questions, Get detailed, personalized
            feedback on your interview answers, body language, manner of
            speaking, etc.
          </Text>
          {this.state.isBooked == false ? (
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
                  {/* {this.state.price} */}
                  150 L.E
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
                  // onPress={() => {
                  //   this.props.navigation.navigate("CvWriting");
                  // }}
                >
                  <Text style={{ color: "white", textTransform: "capitalize" }}>
                    book
                  </Text>
                </Button>
              </View>
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
              <Swiper height={260} dotColor="#CCCCCC" activeDotColor="#CD8930">
                <ReviewsCard />
                <ReviewsCard />
                <ReviewsCard />
              </Swiper>
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
                    {/* {this.state.price} */}
                    150 L.E
                  </Text>
                  <Button
                    disabled
                    style={{
                      marginTop: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                      marginLeft: "56%",
                      backgroundColor: "#f2f2f2",
                    }}
                    onPress={{}}
                  >
                    <Text
                      style={{ color: "#1E4274", textTransform: "capitalize" }}
                    >
                      Booked
                    </Text>
                  </Button>
                </>
              </View>
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
                <>
                  <Button
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
                      style={{ color: "white", textTransform: "capitalize" }}
                    >
                      Review
                    </Text>
                  </Button>
                </>
              </View>
            </>
          )}
        </ScrollView>
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
