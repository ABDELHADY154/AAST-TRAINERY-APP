import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Cards from "../Cards/Cards";
import { axios } from "../../Config/Axios";
export function ActivitySavedS(props) {
  const navigation = useNavigation();
  return <ActivitySaved navigation={navigation} {...props} />;
}

export default class ActivitySaved extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios
      .get("/A/student/studentSaved")

      .then((res) => {
        this.setState({
          posts: res.data.response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ marginTop: "3%" }}>
        <ScrollView>
          {this.state.posts ? (
            this.state.posts.map((e) => {
              return (
                <Cards item={e} key={e.id} navigation={this.props.navigation} />
              );
            })
          ) : (
            <Text>There are no Saved internships here.</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}
