import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "galio-framework";

export default class Cv extends Component {
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
        <Text style={styles.title}>Generate CV</Text>

        <Text
          style={{
            color: "#1E4275",
            width: "93%",
            marginLeft: "4%",
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh
          turpis nisl facilisis odio in venenatis. Parturient nisi sed nulla
          ullamcorper egestas ullamcorper aliquet nunc nunc.
        </Text>
        <Button
          style={styles.button}
          color="#1E4275"
          // onPress={this.handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Download CV</Text>
        </Button>
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
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 30,
  },
});
