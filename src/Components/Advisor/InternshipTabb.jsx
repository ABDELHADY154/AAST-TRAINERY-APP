import React, { Component, useState, useEffect, useRef } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { OpportunityCardAdvisor } from "./OpportunityCardAdvisor";
export function InternshipTabb(props) {
  const navigation = useNavigation();
  return <InternshipTabbScreen navigation={navigation} {...props} />;
}
class InternshipTabbScreen extends Component {
  state = {
    userData: {},
    internshipPosts: [],
    loading: false,
  };
  async componentDidMount() {
    await axios
      .get(`/W/student/company/${this.props.route.params.id}`)
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
                {this.state.internshipPosts ? (
                  this.state.internshipPosts.map((e) => {
                    return (
                      <OpportunityCardAdvisor
                        key={e.id}
                        id={e.id}
                        company_name={e.company_name}
                        title={e.title}
                        company_logo={e.company_logo}
                        description={e.description}
                        application_deadline={e.application_deadline}
                        departments={e.departments}
                        navigation={this.props.navigation}
                      />
                    );
                  })
                ) : (
                  <Text></Text>
                )}
                {/* <OpportunityCardCompany /> */}
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
                  Ended Internships
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
