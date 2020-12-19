import "react-native-gesture-handler";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Stack = createStackNavigator();

class SignInScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="login"
          component={LoginForm}
          options={{
            header: () => {
              "none";
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterForm}
          options={{
            header: () => {
              "none";
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}
export default function (props) {
  const navigation = useNavigation();

  return <SignInScreen {...props} navigation={navigation} />;
}
