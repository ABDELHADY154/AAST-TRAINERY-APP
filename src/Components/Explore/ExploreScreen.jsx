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
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";

import Card from "../Cards/Cards";

import { Feather } from "@expo/vector-icons";

export default class ExploreScreen extends Component {
  state = {
    posts: [],
    refresh: false,
    paginate: 2,
    refreshState: RefreshState.Idle,
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
      .get(`/A/student/posts`)
      .then(res => {
        this.setState({
          posts: res.data.response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getData = async num => {
    var sum = this.state.paginate + Number(num);
    this.setState({
      paginate: sum,
      // refreshState:
    });
    await axios
      .get(`/A/student/posts?q=${this.state.paginate}`)
      .then(res => {
        this.state.posts.concat(res.data.response.data);
      })
      .catch(err => {
        console.log(err);
      });
    // return this.state.posts;
  };
  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });
    await axios
      .get(`/A/student/posts`)
      .then(res => {
        this.setState({
          posts: res.data.response.data,
        });
        this.setState({ refreshState: RefreshState.Idle });
        console.log(this.state.posts);
      })
      .catch(err => {
        console.log(err);
      });
  };
  footerRefreshing = async () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    await axios
      .get(`/A/student/posts?page=${this.state.paginate}`)
      .then(res => {
        this.setState({
          posts: this.state.posts.concat(res.data.response.data),
        });
        this.setState({
          refreshState: RefreshState.Idle,
          paginate: this.state.paginate + 1,
        });
        console.log(this.state.posts);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <RefreshListView
            data={this.state.posts}
            keyExtractor={item => item.id}
            renderItem={Card}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={() => {
              this.footerRefreshing();
              // this.getData(10);
            }}
            footerRefreshingText="Loading"
          />
          {/* <ScrollView
            refreshControl={
              <RefreshControl
                colors={["#1E4274"]}
                refreshing={this.state.refresh}
                onRefresh={this.onRefresh}
              />
            }
            snapToEnd={false}
            // onScrollEndDrag={() => {
            //   this.getData(10);
            // }}
          >
            {this.state.posts !== [] ? (
              this.state.posts.map(item => {
                return <Card item={item} key={item.id} />;
              })
            ) : (
              <Text></Text>
            )}
          </ScrollView> */}
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
