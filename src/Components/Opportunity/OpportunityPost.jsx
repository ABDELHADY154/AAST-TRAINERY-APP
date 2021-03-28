import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileImgLoader } from "../Loader/Loader";
class OpportunityPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "3%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>OpportunityPost</Text>
      </View>
    );
  }
}

export default OpportunityPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
