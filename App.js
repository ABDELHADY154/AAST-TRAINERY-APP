import "react-native-gesture-handler";
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/Components/Splash/SplashScreen";
import Home from "./src/Components/Home/HomeScreen";
import LoginForm from "./src/Components/Auth/LoginForm";
import ForgetPass from "./src/Components/Auth/ForgetPass";
import RegisterScreen from "./src/Components/Auth/RegisterForm";
import EducationScreen from "./src/Components/Profile/Educationinfo/Educationinfo";
import AcademicScreen from "./src/Components/Profile/Academicsinfo/Academicsinfo";
import GeneralScreen from "./src/Components/Profile/Generalinfo/Generalinfo";
import ExperienceScreen from "./src/Components/Profile/Experienceinfo/Experienceinfo";
import CoursesScreen from "./src/Components/Profile/Coursesinfo/Coursesinfo";
import AccountScreen from "./src/Components/Profile/Accountsinfo/Accountsinfo";
import Skillinfo from "./src/Components/Profile/Skillinfo/Skillinfo";
import Language from "./src/Components/Profile/Skillinfo/Language";
import Interests from "./src/Components/Profile/Skillinfo/Interests";
import { axios } from "./src/Config/Axios";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tutorials } from "./src/Components/Tutorials/Tutorialscreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackHandler, Alert } from "react-native";

import {
  DefaultTheme,
  configureFonts,
  Provider as PaperProvider,
} from "react-native-paper";
import { isLoading } from "expo-font";
import { Button } from "react-native";
const AuthContext = React.createContext();

function SignUpScreen(props) {
  const navigation = useNavigation();
  const { signUp } = React.useContext(AuthContext);
  return (
    <RegisterScreen {...props} navigation={navigation} userSignUp={signUp} />
  );
}
function SignInScreen(props) {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  return <LoginForm {...props} navigation={navigation} userLogin={signIn} />;
}
function ForgetPassScreen(props) {
  const navigation = useNavigation();
  return <ForgetPass {...props} navigation={navigation} />;
}
function EducationInfoFormScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <EducationScreen {...props} navigation={navigation} route={route} />;
}
function SkillinfoFormScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <Skillinfo {...props} navigation={navigation} route={route} />;
}
function LanguageFormScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <Language {...props} navigation={navigation} route={route} />;
}
function InterestsFormScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <Interests {...props} navigation={navigation} route={route} />;
}
const Stack = createStackNavigator();
const fontConfig = {
  web: {
    regular: {
      fontFamily: "SF-L",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "SF-M",
      fontWeight: "normal",
    },
  },
};
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E4274",
    secondary: "#CD8930",
  },
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  const [showTutorial, setShowTurial] = useState(true);
  const TutorialsSCreen = props => {
    const navigation = useNavigation();
    const showTutorial = val => {
      setShowTurial(val);
    };
    return <Tutorials {...props} navigation={navigation} show={showTutorial} />;
  };
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        await Font.loadAsync({
          "SF-L": require("./assets/fonts/SF-Compact-Display-Light.otf"),
          "SF-M": require("./assets/fonts/SF-Compact-Display-Medium.otf"),
        });
        userToken = await AsyncStorage.getItem("userToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => {
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      }, 2000);
    };
    bootstrapAsync();
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit Trainery?", [
        {
          text: "NO",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async data => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    [],
  );

  const Trainery = props => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
      <Home
        {...props}
        navigation={navigation}
        route={route}
        logout={() => {
          dispatch({ type: "SIGN_OUT" });
        }}
      />
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="App">
            {state.isLoading ? (
              <>
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{
                    header: () => {
                      "none";
                    },
                  }}
                />
              </>
            ) : state.userToken == null ? (
              showTutorial == true ? (
                <Stack.Screen
                  name="Tutorial"
                  component={TutorialsSCreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
              ) : (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",

                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={SignUpScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="Forget-password"
                    component={ForgetPassScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                </>
              )
            ) : (
              <>
                <Stack.Screen
                  name="App"
                  component={Trainery}
                  options={({ route }) => ({
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "pop",
                    title: "App",
                    header: () => {
                      "none";
                    },
                  })}
                />

                <Stack.Screen
                  name="EducationForm"
                  component={EducationInfoFormScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="GeneralForm"
                  component={GeneralScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Skillinfo"
                  component={SkillinfoFormScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Language"
                  component={LanguageFormScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Interests"
                  component={InterestsFormScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="AcademicForm"
                  component={AcademicScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="ExperienceForm"
                  component={ExperienceScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="CoursesForm"
                  component={CoursesScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="AccountForm"
                  component={AccountScreen}
                  options={{
                    cardStyle: { backgroundColor: "#fff" },
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
// headerStyle: {
//   backgroundColor: "white",
// },

// headerMode: "float",
// headerTintColor: "#1E4274",
// headerTitleStyle: {
//   fontWeight: "bold",
//   alignSelf: "center",
//   justifyContent: "center",
//   alignItems: "center",
//   fontSize: 20,
// },
// headerLeft: () => (
//   <IconButton
//     icon="menu"
//     type="text"
//     size={40}
//     color="#1E4274"
//     onPress={() => {
//       AsyncStorage.removeItem("userData");
//       AsyncStorage.removeItem("userToken");
//       AsyncStorage.removeItem("config");
//       axios.defaults.headers.common["Authorization"] = ``;
//       dispatch({ type: "SIGN_OUT" });
//     }}
//   />
// ),
// headerRight: () => (
//   <Feather
//     name="search"
//     size={28}
//     color="#1E4274"
//     style={{
//       marginRight: 20,
//     }}
//     onPress={() => {
//       this.props.navigation.navigate("Search");
//     }}
//   />
// ),
