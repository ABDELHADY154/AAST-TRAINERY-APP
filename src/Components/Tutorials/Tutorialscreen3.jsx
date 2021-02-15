import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Divider, Button } from "react-native-paper";

export class Tutorial3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/Images/Tutorials/Tutorial3.png")}
          style={styles.img}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Career Coaching Guidance</Text>
          {/* <hr /> */}
          <Divider style={styles.hr} />
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dolor
            quis morbi sagittis donec sed massa. Velit malesuada amet pretium
            turpis in commodo aliquet pulvinar ultrices.
          </Text>
        </View>
        <View style={styles.bottomBtns}>
          <View style={styles.btns}>
            <Button
              // icon="camera"
              mode="text"
              color="#1E4275"
              style={{ width: 70 }}
              // onPress={() => console.log("Pressed")}
            >
              Skip
            </Button>
            <Button
              // icon="camera"
              mode="text"
              color="#1E4275"
              // style={{ width: 80 }}

              // onPress={() => console.log("Pressed")}
            >
              Next
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    flex: 1,
    // flexDirection: "row",
    width: "100%",
    // resizeMode: "contain",
    height: 303,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#1E4275",
    marginTop: 56,
  },
  hr: {
    backgroundColor: "#CD8930",
    height: 2,
    width: 254,
    marginTop: 11,
    marginBottom: 13,
  },
  text: {
    flex: 1,
    alignItems: "center",
    // textAlign: "center",
    paddingHorizontal: 28,
    // width: 319,
    fontSize: 14,
    lineHeight: 20,
    color: "#1E4275",
  },
  bottomBtns: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 34,
    // marginHorizontal: 20,
  },
  btns: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
