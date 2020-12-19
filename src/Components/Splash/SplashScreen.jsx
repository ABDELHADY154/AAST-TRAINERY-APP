import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default class SplashScreen extends Component {
  render() {
    // const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>SplashScreen</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
// export default function (props) {
//   const navigation = useNavigation();

//   return <SplashScreen {...props} navigation={navigation} />;
// }

// import { axios } from "./src/Config/Axios";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// class MyBackButton extends React.Component {
//   render() {
//     // Get it from props
//     const { navigation } = this.props;
//   }
// }

// // Wrap and export
// export default function (props) {
//   const navigation = useNavigation();

//   return <MyBackButton {...props} navigation={navigation} />;
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: 40,
  },
});
