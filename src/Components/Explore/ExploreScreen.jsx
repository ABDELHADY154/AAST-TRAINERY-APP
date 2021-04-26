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
import { colors, Header } from "react-native-elements";
import Drawer from "react-native-drawer-menu";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation, useRoute } from "@react-navigation/native";

import Card from "../Cards/Cards";

import { Feather } from "@expo/vector-icons";

function CardCompt(props) {
  // const { navigation } = useNavigation();
  // const route = useRoute();navigation={navigation} route={route}
  return <Card {...props} />;
}
export default class ExploreScreen extends Component {
  state = {
    posts: [],
    refresh: false,
    paginate: 2,
    refreshState: RefreshState.Idle,
    spinner: true,
  };

  CardComponent = props => {
    return (
      <Card
        {...props}
        navigation={this.props.navigation}
        reload={this.refresh}
      />
    );
  };

  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/A/student/posts?page=1`)
      .then(res => {
        this.setState({
          posts: res.data.response.data,
          spinner: false,
        });
      })
      .catch(err => {
        if (err.response.data.status == 401) {
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("config");
          axios.defaults.headers.common["Authorization"] = ``;
          this.props.logout();
        }
      });
  }

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

  refresh = async () => {
    this.setState({ spinner: true });
    await axios
      .get(`/A/student/posts?page=1`)
      .then(res => {
        this.setState({
          posts: res.data.response.data,
          spinner: false,
        });
      })
      .catch(err => {
        if (err.response.data.status == 401) {
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("config");
          axios.defaults.headers.common["Authorization"] = ``;
          this.props.logout();
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Spinner
            visible={this.state.spinner}
            cancelable={false}
            size="large"
            color="#1E4274"
            animation="fade"
            overlayColor="rgba(255, 255, 255, 0.8)"
            textStyle={{ color: "#1E4274", textAlign: "center" }}
          />
          <RefreshListView
            data={this.state.posts}
            keyExtractor={item => item.id}
            renderItem={this.CardComponent}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={() => {
              this.footerRefreshing();
            }}
            footerRefreshingText="Loading"
          />
        </SafeAreaView>
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
