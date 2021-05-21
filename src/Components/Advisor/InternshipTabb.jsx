import React, { Component, useState, useEffect, useRef } from "react";
import { axios } from "../../Config/Axios";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cards from "../Cards/CompanyCards";
import Spinner from "react-native-loading-spinner-overlay";

export function InternshipTabb(props) {
  const navigation = useNavigation();
  return <InternshipTabbScreen navigation={navigation} {...props} />;
}
class InternshipTabbScreen extends Component {
  state = {
    userData: {},
    internshipPosts: [],
    loading: false,
    spinner: false,
  };
  refresh = async () => {
    this.setState({ spinner: true });
    await axios
      .get(`/A/student/advisor/${this.props.route.params.id}`)
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
      .catch(function (error) {
        this.setState({
          spinner: false,
        });
        console.log(error.response.data.errors);
      });
  };
  async componentDidMount() {
    await axios
      .get(`/W/student/advisor/${this.props.route.params.id}`)
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
      .catch(function (error) {
        this.setState({
          spinner: false,
        });
        console.log(error.response.data.errors);
      });
  }
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
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  Published Internship
                </Text>
                {this.state.internshipPosts ? (
                  this.state.internshipPosts.map((e) => {
                    // console.log(e);
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
