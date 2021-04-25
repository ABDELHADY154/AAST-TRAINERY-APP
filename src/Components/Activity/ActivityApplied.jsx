import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Cards from "../Cards/Cards";
import { axios } from "../../Config/Axios";
import { RefreshControl } from "react-native";

export function ActivityApplieds(props) {
  const navigation = useNavigation();
  return <ActivityApplied navigation={navigation} {...props} />;
}

export default class ActivityApplied extends Component {
  state = {
    posts: [],
    refresh: false,
  };

  onRefresh = async () => {
    await axios
      .get("/A/student/studentApplied")
      .then(res => {
        this.setState({
          posts: res.data.response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.setState({ refresh: true });
    axios
      .get("/A/student/studentApplied")
      .then(res => {
        this.setState({
          posts: res.data.response.data,
          refresh: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.posts);
    return (
      <View style={{ marginTop: "3%" }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              colors={["#1E4274"]}
            />
          }
        >
          {this.state.posts ? (
            this.state.posts.map(e => {
              return (
                <Cards item={e} key={e.id} navigation={this.props.navigation} />
              );
            })
          ) : (
            <Text>There are no Applied internships here.</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}
