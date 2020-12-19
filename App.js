import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/Splash/SplashScreen";
import HomeScreen from "./src/Components/Home/HomeScreen";
import SignInScreen from "./src/Components/Auth/SignIn";
import * as Font from "expo-font";

const Stack = createStackNavigator();
export default class App extends Component {
  state = {
    isLoading: false,
    userToken: null,
    isSignedIn: false,
    isSignedOut: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      "SF-L": require("./assets/fonts/SF-Compact-Display-Light.otf"),
      "SF-M": require("./assets/fonts/SF-Compact-Display-Medium.otf"),
    });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  }
  render() {
    if (this.state.isLoading == true) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                header: () => {
                  "none";
                },
              }}
            />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
