import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Divider, Button } from "react-native-paper";
import Onboarding from "react-native-onboarding-swiper";
const Skip = () => (
  <Button mode="text" color="#1E4275">
    Skip
  </Button>
);
const Next = () => (
  <Button mode="text" color="#1E4275">
    Next
  </Button>
);
const Done = () => (
  <Button mode="text" color="#1E4275">
    Done
  </Button>
);
const Dots = ({ selected }) => {
  let backgroundColor = selected ? "#1E4275" : "rgba(30, 66, 117,.5)";
  return (
    <View
      style={{
        width: 8,
        height: 8,
        marginHorizontal: 3,
        borderRadius: 5,
        backgroundColor,
      }}
    />
  );
};

let backgroundButtonBarColor = "#fff";

export class Tutorials extends Component {
  render() {
    return (
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        bottomBarColor={backgroundButtonBarColor}
        // onSkip={() => navigation.replace("Explore")}
        // onDone={() => navigation.navigate("Explore")}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../../assets/Images/Tutorials/Tutorial1.png")}
                style={styles.img}
              />
            ),
            title: (
              <Text style={styles.title}>Start Your Non-Experience Career</Text>
            ),

            subtitle: (
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                dolor quis morbi sagittis donec sed massa. Velit malesuada amet
                pretium turpis in commodo aliquet pulvinar ultrices.
              </Text>
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../../assets/Images/Tutorials/Tutorial2.png")}
                style={styles.img}
              />
            ),
            title: <Text style={styles.title}>Student CV and Protfolio</Text>,

            subtitle: (
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                dolor quis morbi sagittis donec sed massa. Velit malesuada amet
                pretium turpis in commodo aliquet pulvinar ultrices.
              </Text>
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../../assets/Images/Tutorials/Tutorial3.png")}
                style={styles.img}
              />
            ),
            title: <Text style={styles.title}>Career Coaching Guidance</Text>,

            subtitle: (
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                dolor quis morbi sagittis donec sed massa. Velit malesuada amet
                pretium turpis in commodo aliquet pulvinar ultrices.
              </Text>
            ),
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 303,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#1E4275",
    paddingBottom: 11,
    borderBottomColor: "#CD8930",
    borderBottomWidth: 2,
    width: 275,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    fontSize: 14,
    lineHeight: 20,
    color: "#1E4275",
    paddingTop: 13,
  },
  bottomBtns: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 34,
  },
  btns: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
