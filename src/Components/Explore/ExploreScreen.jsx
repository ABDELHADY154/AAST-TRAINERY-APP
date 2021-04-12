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
import { IconButton } from "react-native-paper";
import { axios } from "../../Config/Axios";
import { Header } from "react-native-elements";
import Drawer from "react-native-drawer-menu";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

import Card from "../Cards/Cards";

import { Feather } from "@expo/vector-icons";

export default class ExploreScreen extends Component {
  state = {
    posts: [],
    refresh: false,
  };
  // wait = timeout => {
  //   return new Promise(resolve => setTimeout(resolve, timeout));
  // };
  onRefresh = () => {
    this.setState({ refresh: true });
    // this.wait(500).then(() => {
    this.getData();
    this.setState({ refresh: false });
    // });
  };
  async componentDidMount() {
    await axios
      .get("/A/student/posts")
      .then(res => {
        this.setState({
          posts: res.data.response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getData = async () => {
    await axios
      .get("/A/student/posts")
      .then(res => {
        this.setState({
          posts: res.data.response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
    return this.state.posts;
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* <ScrollView
          
          > */}
          <View>
            <FlatList
              data={this.state.posts}
              renderItem={Card}
              onEndReached={this.getData} // required, should return a promise
              activityIndicatorColor={"#1E4274"} // optional
              showDefaultLoadingIndicators={true} // optional
              onEndReachedThreshold={10} // optional
              // HeaderLoadingIndicator={() => { /** Your loading indicator */ }} // optional
              // FooterLoadingIndicator={() => { /** Your loading indicator */ }} // optional
              enableAutoscrollToTop={false} // optional | default - false
              // You can use any other prop on react-native's FlatList
              refreshControl={
                <RefreshControl
                  colors={["#1E4274"]}
                  refreshing={this.state.refresh}
                  onRefresh={this.onRefresh}
                />
              }
            />
          </View>
          {/* </ScrollView> */}
          {/* <ScrollView>
            {this.state.posts !== [] ? (
              this.state.posts.map(item => {
                return <CompanyCard />;
              })
            ) : (
              <Text></Text>
            )} */}
        </SafeAreaView>
        {/* <StatusBar style="auto" /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
{
  /* <Button
            styel={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
            onPress={() => {
              AsyncStorage.removeItem("userData");
              AsyncStorage.removeItem("userToken");
              AsyncStorage.removeItem("config");
              this.props.logout();
            }}
          >
            <Text>Logout</Text>
          </Button> */
}
