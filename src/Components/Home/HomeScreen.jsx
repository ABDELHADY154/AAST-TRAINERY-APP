import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import { axios } from "../../Config/Axios";

class HomeScreen extends Component {
  state = {
    userData: {},
  };

  async componentDidMount() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      if (data) {
        this.setState({ userData: data });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Welcome {this.state.userData.name} </Text>
        <Button
          onPress={() => {
            AsyncStorage.removeItem("userData");
            this.props.navigation.navigate("SignIn", { screen: "Login" });
          }}
        >
          <Text>Logout</Text>
        </Button>
        <StatusBar style="auto" />
      </View>
    );
  }
}
export default function (props) {
  const navigation = useNavigation();

  return <HomeScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: 40,
  },
});
