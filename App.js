import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/Splash/SplashScreen";
import HomeScreen from "./src/Components/Home/HomeScreen";
import SignInScreen from "./src/Components/Auth/SignIn";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const Stack = createStackNavigator();
export default class App extends Component {
  state = {
    userData: {},
    isLoading: true,
    userToken: null,
    isSignedIn: false,
    isSignedOut: true,
  };
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      if (data) {
        this.setState({ userData: data });
        this.setState({
          userToken: this.state.userData.token,
          isSignedIn: true,
          isSignedOut: false,
          // isLoading: false,
        });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      "SF-L": require("./assets/fonts/SF-Compact-Display-Light.otf"),
      "SF-M": require("./assets/fonts/SF-Compact-Display-Medium.otf"),
    });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
    this.getToken();
  }
  render() {
    if (this.state.isLoading == true) {
      return <SplashScreen />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator title="Root">
          {this.state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  header: () => {
                    "none";
                  },
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  header: () => {
                    "none";
                  },
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
