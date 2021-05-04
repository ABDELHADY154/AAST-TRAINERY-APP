import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Cards from "../Cards/Cards";
import { axios } from "../../Config/Axios";
import { RefreshControl } from "react-native";

export function ActivityAcceptedS(props) {
  const navigation = useNavigation();
  return <ActivityAccepted navigation={navigation} {...props} />;
}

export default class ActivityAccepted extends Component {
  state = {
    posts: [],
    refresh: false,
  };

  onRefresh = async () => {
    await axios
      .get("/A/student/studentAccepted")
      .then((res) => {
        this.setState({
          posts: res.data.response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get("/A/student/studentAccepted")

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
    // console.log(this.state.posts);
    return (
      <SafeAreaView>
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
            {/* {this.state.posts ? ( */}
            {this.state.posts && this.state.posts.length !== 0 ? (
              this.state.posts.map((e) => {
                return (
                  <Cards
                    item={e}
                    key={e.id}
                    navigation={this.props.navigation}
                  />
                );
              })
            ) : (
              <View
                style={{
                  width: "98%",
                  justifyContent: "center",
                  alignContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  source={require("../../assets/Images/void.png")}
                  style={{
                    marginTop: "5%",
                    width: "100%",
                    height: 420,
                    alignSelf: "center",
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
