import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { axios } from "../../Config/Axios";
import {
  CvCoach,
  InterviewCoach,
  CareerCa,
  Advisingcoach,
} from "./CareerCards";

export default class CareerCoaching extends Component {
  state = {
    data: [],
    refresh: false,
  };
  componentDidMount() {
    axios
      .get("/A/sessions")

      .then(res => {
        this.setState({
          data: res.data.response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  onRefresh = () => {
    this.setState({
      refresh: true,
    });
    axios
      .get("/A/sessions")

      .then(res => {
        this.setState({
          data: res.data.response.data,
          refresh: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          refresh: false,
        });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              colors={["#1E4274"]}
            />
          }
        >
          {this.state.data && this.state.data.length !== 0 ? (
            this.state.data.map(data => {
              return (
                <CvCoach
                  item={data}
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  desc={data.desc}
                  price={data.price}
                  navigation={this.props.navigation}
                  status={data.status}
                />
              );
            })
          ) : (
            <View
              style={{
                // width: "98%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                height: "100%",
              }}
            >
              <Text style={{ color: "#1E4274", fontSize: 18 }}>
                No Sessions Avilable
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: "3%",
    // backgroundColor: "white",
  },
});
