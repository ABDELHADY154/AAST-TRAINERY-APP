import React, { Component, useState, useEffect, useRef } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { OpportunityCardCompany } from "./OpportunityCardCompany";
export function InternshipTap(props) {
  const navigation = useNavigation();
  return <InternshipTapScreen navigation={navigation} {...props} />;
}
class InternshipTapScreen extends Component {
  state = {
    progressWithOnComplete: 0,
    progressCustomized: 0,
    userData: {},
    loading: false,
  };
  async componentDidMount() {
    await axios
      .get("/A/student/get-profilePersonal")
      .then((response) => {
        this.setState({
          loading: true,
          userData: response.data.response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.userData);
    return (
      <View style={styles.container}>
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
                  Opened Internship
                </Text>
                <OpportunityCardCompany />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1E4274",
                    fontWeight: "bold",
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  Ended Internshipz
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1E4274",
                    lineHeight: 20,
                    marginTop: 5,
                  }}
                >
                  There are currently no ended Internship at Qowwa Inc.
                </Text>
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
