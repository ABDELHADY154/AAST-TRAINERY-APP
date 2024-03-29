import React, { Component, useState, useEffect, useRef } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Cards from "../Cards/CompanyCards";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

import {
  OpportunityCardCompany,
  PromotedCard,
  AdsCard,
} from "./OpportunityCardCompany";

export function InternshipTap(props) {
  const navigation = useNavigation();
  return <InternshipTapScreen navigation={navigation} {...props} />;
}
class InternshipTapScreen extends Component {
  state = {
    userData: {},
    internshipPosts: [],
    loading: false,
    spinner: false,
  };
  async componentDidMount() {
    await axios
      .get(`/A/student/company/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
          internshipPosts: response.data.response.data.internshipPosts,
        });
        // console.log(response.data.response.data);
        this.props.getUserData(this.state.userData);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  }
  refresh = async () => {
    this.setState({
      spinner: true,
    });
    await axios
      .get(`/A/student/company/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: false,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
          internshipPosts: response.data.response.data.internshipPosts,
        });
        // console.log(response.data.response.data);
        this.props.getUserData(this.state.userData);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  };
  savePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/save/${this.state.userData.id}`)
      .then((res) => {
        console.log(res.data);
        // this.refreshComponent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  unSavePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/unsave/${this.state.userData.id}`)
      .then((res) => {
        console.log(res.data);
        // this.refreshComponent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // console.log(this.state.userData);
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          cancelable={false}
          size="large"
          color="#1E4274"
          animation="fade"
          overlayColor="rgba(255, 255, 255, 0.8)"
          textStyle={{ color: "#1E4274", textAlign: "center" }}
        />
        <ScrollView>
          <View style={{ paddingHorizontal: 15, marginBottom: 15 }}>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                    marginBottom: 10,
                    marginVertical: 10,
                  }}
                >
                  Opened Internships
                </Text>

                {this.state.internshipPosts.open ? (
                  this.state.internshipPosts.open.map((e) => {
                    return (
                      <Cards
                        key={e.id}
                        navigation={this.props.navigation}
                        item={e}
                        reload={this.refresh}
                      />
                    );
                  })
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    fontWeight: "bold",
                    flex: 1,
                    marginVertical: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  Ended Internships
                </Text>

                {this.state.internshipPosts.ended ? (
                  this.state.internshipPosts.ended.map((e) => {
                    return (
                      <Cards
                        key={e.id}
                        navigation={this.props.navigation}
                        item={e}
                        reload={this.refresh}
                      />
                    );
                  })
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
