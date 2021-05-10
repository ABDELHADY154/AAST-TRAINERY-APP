import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "galio-framework";
import Swiper from "react-native-swiper";

import { PortCaro } from "./PortCaro";
import { MyPortCaro } from "./MyPortCaro";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Portfolio extends Component {
  state = {
    myport: [],
  };
  render() {
    return (
      <View style={styles.container}>
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
        <Text style={styles.title}>Portfolio</Text>
        <ScrollView>
          <Swiper height={500} dotColor="#CCCCCC" activeDotColor="#CD8930">
            <PortCaro />
            <PortCaro />
          </Swiper>
          <Text style={styles.title}>My Portfolios</Text>
          {/* E3KESY EL IF STATEMENT LAMA YEEGY EL API */}
          {!this.state.myport ? (
            <>
              <Swiper height={500} dotColor="#CCCCCC" activeDotColor="#CD8930">
                <MyPortCaro />
                <MyPortCaro />
              </Swiper>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: "#1E4275",
                  width: "93%",
                  marginLeft: "4%",
                  fontSize: 16,
                  marginBottom: "25%",
                }}
              >
                You don’t have a portfolio yet check our portfolio themes or
                <Text
                  onPress={() => {
                    this.props.navigation.push("Cv");
                  }}
                  style={{
                    color: "#CD8930",
                    width: "93%",
                    marginLeft: "4%",
                    fontSize: 16,
                  }}
                >
                  {" "}
                  generate CV
                </Text>{" "}
                for free
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "5.4%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },
});
