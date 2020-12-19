import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/Splash/SplashScreen";
import HomeScreen from "./src/Components/Home/HomeScreen";
import SignInScreen from "./src/Components/Auth/SignIn";

const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    isLoading: true,
    userToken: null,
    isSignedIn: false,
    isSignedOut: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
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
