// import "react-native-gesture-handler";
// import React, { Component } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useNavigation } from "@react-navigation/native";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";

// const config = {
//   animation: "spring",
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };
// const Stack = createStackNavigator();

// class SignInScreen extends Component {
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen
//           name="login"
//           component={LoginForm}
//           options={{
//             header: () => {
//               "none";
//             },
//             transitionSpec: {
//               open: config,
//               close: config,
//             },
//           }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterForm}
//           options={{
//             header: () => {
//               "none";
//             },
//             transitionSpec: {
//               open: config,
//               close: config,
//             },
//           }}
//         />
//       </Stack.Navigator>
//     );
//   }
// }
// export default function (props) {
//   const navigation = useNavigation();

//   return <SignInScreen {...props} navigation={navigation} />;
// }
