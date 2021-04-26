import { StatusBar } from "expo-status-bar";
import React, { Component, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Easing,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import Explore from "../Explore/ExploreScreen";
import Profile from "../Profile/ProfileScreen";
import Activity from "../Activity/ActivityScreen";
import CareerCoaching from "../CareerCoaching/CareerCoaching";
import Notification from "../Notification/Notification";
import { axios } from "../../Config/Axios";
import { Icon, Divider } from "react-native-elements";
import AnimatedTabBar from "@gorhom/animated-tabbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, Avatar } from "react-native-paper";
const Tab = createBottomTabNavigator();
const AuthContext = React.createContext();
import Drawer from "react-native-drawer-menu";
import { DrawerProfile } from "../Loader/Loader";
const Tabs = AnimatedTabBarNavigator();

import { Header } from "react-native-elements";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const tabs = {
  Explore: {
    labelStyle: {
      color: "#fff",
      fontSize: 15,
    },
    icon: {
      component: () => {
        return <Icon name="home-outline" type="ionicon" color="#fff" />;
      },
      activeColor: "rgba(91,55,183,1)",
    },
    background: {
      activeColor: "#CD8930",
    },
  },
  Profile: {
    labelStyle: {
      color: "#fff",
      fontSize: 15,
    },
    icon: {
      component: () => {
        return (
          <Icon name="person-circle-outline" type="ionicon" color="#fff" />
        );
      },
      activeColor: "rgba(91,55,183,1)",
    },
    background: {
      activeColor: "#CD8930",
    },
  },
  Activity: {
    labelStyle: {
      color: "#fff",
      fontSize: 15,
    },
    icon: {
      component: () => {
        return <Icon name="bolt" type="font-awesome-5" color="#fff" />;
      },
      activeColor: "rgba(91,55,183,1)",
    },
    background: {
      activeColor: "#CD8930",
    },
  },
  Coaching: {
    labelStyle: {
      color: "#fff",
      fontSize: 15,
    },
    icon: {
      component: () => {
        return <Icon name="briefcase-outline" type="ionicon" color="#fff" />;
      },

      activeColor: "rgba(91,55,183,1)",
    },
    background: {
      activeColor: "#CD8930",
    },
  },
  Notifications: {
    labelStyle: {
      color: "#fff",
      fontSize: 15,
    },
    icon: {
      component: () => {
        return <Icon name="bell" type="font-awesome-5" color="#fff" />;
      },

      activeColor: "rgba(91,55,183,1)",
    },
    background: {
      activeColor: "#CD8930",
    },
  },
};
export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      drawerRef: null,
      drawerIsOpened: false,
      headerTitle: "",
      userData: {},
      name: "",
      email: "",
      image: null,
      loading: true,
    };
  }

  getUserData = async () => {
    await axios
      .get("/A/student/get-profilePersonal")
      .then(response => {
        this.setState({
          loading: false,
          // userData: response.data.response.data,
          name: response.data.response.data.name,
          email: response.data.response.data.email,
          image: response.data.response.data.image,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  };
  async componentDidMount() {
    await axios
      .get("/A/student/get-profilePersonal")
      .then(response => {
        this.setState({
          loading: false,
          // userData: response.data.response.data,
          name: response.data.response.data.name,
          email: response.data.response.data.email,
          image: response.data.response.data.image,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  }
  ExploreScreen = props => {
    const navigation = useNavigation();
    const signOut = () => {
      this.props.logout();
    };
    const setTitle = title => {
      this.setState({ headerTitle: title });
    };
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          this.setState({ headerTitle: "Explore" });
        }
      }, [navigation]),
    );

    return (
      <Explore
        {...props}
        navigation={navigation}
        logout={signOut}
        // drawer={}
      />
    );
  };
  ProfileScreen = props => {
    const navigation = useNavigation();
    const getUserData = data => {
      this.setState({
        userData: data,
      });
    };
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          this.setState({ headerTitle: "Profile" });
        }
      }, [navigation]),
    );

    return (
      <Profile {...props} navigation={navigation} getUserData={getUserData} />
    );
  };
  NotificationScreen = props => {
    const navigation = useNavigation();
    const getUserData = data => {
      this.setState({
        userData: data,
      });
    };
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          this.setState({ headerTitle: "Notifications" });
        }
      }, [navigation]),
    );

    return (
      <Notification
        {...props}
        navigation={navigation}
        getUserData={getUserData}
      />
    );
  };
  ActivityScreen = props => {
    const navigation = useNavigation();
    const getUserData = data => {
      this.setState({
        userData: data,
      });
    };
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          this.setState({ headerTitle: "Activity" });
        }
      }, [navigation]),
    );

    return (
      <Activity {...props} navigation={navigation} getUserData={getUserData} />
    );
  };
  CareerCoachingScreen = props => {
    const navigation = useNavigation();
    const getUserData = data => {
      this.setState({
        userData: data,
      });
    };
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          this.setState({ headerTitle: "Career Coaching" });
        }
      }, [navigation]),
    );

    return (
      <CareerCoaching
        {...props}
        navigation={navigation}
        getUserData={getUserData}
      />
    );
  };
  setDrawerRef = ref => {
    this.setState({ drawerRef: ref });
  };
  render() {
    // const studentName = this.state.userData.fullName;
    // const image = this.state.userData.image;
    var drawerContent = (
      <View>
        <View
          style={{
            height: "100%",
            backgroundColor: "#fff",
            // justifyContent: "center",
          }}
        >
          <ScrollView>
            {this.state.loading ? (
              <View
                style={{
                  backgroundColor: "#1E4274",

                  padding: "10%",
                }}
              >
                <DrawerProfile
                  style={{
                    marginTop: "10%",
                    paddingLeft: "-6%",
                    paddingBottom: "-4%",
                  }}
                />
              </View>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate("App", {
                    screen: "Profile",
                    params: {
                      screen: "Personal Info",
                    },
                  });
                  this.state.drawerRef.closeDrawer();
                }}
              >
                <View style={{ backgroundColor: "#1E4274" }}>
                  <Avatar.Image
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: 20,
                      marginTop: "18%",
                    }}
                    size={70}
                    source={{ uri: this.state.image }}
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                  >
                    {this.state.name}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      marginLeft: 20,
                      // marginTop: 5,
                      marginBottom: 20,
                    }}
                  >
                    {this.state.email}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            <TouchableOpacity
              style={{
                // backgroundColor: "#F2F2F2",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
              onPress={() => {
                this.props.navigation.push("GeneralForm");
              }}
            >
              <Feather
                name="edit"
                size={18}
                color="#1E4274"
                style={{ paddingRight: 10, paddingLeft: 2 }}
              />
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={20}
                color="#1E4274"
                style={{ paddingRight: 10 }}
              />
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                Generate CV
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={20}
                color="#1E4274"
                style={{ paddingRight: 10 }}
              />
              <Text style={{ color: "#1E4274", fontSize: 16 }}>Portfolio</Text>
              <FontAwesome
                name="dollar"
                size={15}
                color="#CD8930"
                style={{ paddingLeft: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <Feather
                name="settings"
                size={18}
                color="#1E4274"
                style={{ paddingRight: 10, paddingLeft: 2 }}
              />
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                Account settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <Feather
                name="info"
                size={18}
                color="#1E4274"
                style={{ paddingRight: 10, paddingLeft: 2 }}
              />
              <Text style={{ color: "#1E4274", fontSize: 16 }}>About Us</Text>
            </TouchableOpacity>
            <Divider style={{ backgroundColor: "#ccc" }} />
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 22,
              }}
            >
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                Help center
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 22,
              }}
            >
              <Text style={{ color: "#1E4274", fontSize: 16 }}>
                Terms and conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 22,
              }}
              onPress={() => {
                AsyncStorage.removeItem("userData");
                AsyncStorage.removeItem("userToken");
                AsyncStorage.removeItem("config");
                axios.defaults.headers.common["Authorization"] = ``;
                this.props.logout();
              }}
            >
              <Text style={{ color: "#1E4274", fontSize: 16 }}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
    var customStyles = {
      drawer: {
        shadowColor: "#fff",
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
      mask: {},
      main: {},
    };
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
    return (
      <Drawer
        ref={this.setDrawerRef}
        style={styles.drawer}
        drawerWidth={300}
        drawerContent={drawerContent}
        type={Drawer.types.Default}
        customStyles={{ drawer: customStyles.drawer }}
        drawerPosition={Drawer.positions.Left}
        onDrawerOpen={() => {
          this.setState({ drawerIsOpened: true });
          this.getUserData();
        }}
        onDrawerClose={() => {
          this.setState({ drawerIsOpened: false });
          // this.props.navigation.setOptions({ headerShown: true });
        }}
        easingFunc={Easing.ease}
      >
        <Header
          leftComponent={{
            icon: "menu",
            color: this.state.headerTitle == "Profile" ? "#fff" : "#1E4275",
            size: 39,
            onPress: () => {
              this.state.drawerIsOpened == false
                ? this.state.drawerRef.openDrawer()
                : this.state.drawerRef.closeDrawer();
            },
          }}
          centerComponent={{
            text: this.state.headerTitle,
            style: {
              color: this.state.headerTitle == "Profile" ? "#fff" : "#1E4275", //"#1E4275",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 7,
            },
          }}
          // rightComponent={{ icon: "search", color: "#1E4275", size: 35 }}
          rightComponent={
            this.state.headerTitle == "Explore" ? (
              <Feather
                name="search"
                size={28}
                color={this.state.headerTitle == "Profile" ? "#fff" : "#1E4275"}
                style={{
                  marginTop: 6,
                }}
                onPress={() => {
                  this.props.navigation.push("SearchScreen");
                }}
              />
            ) : (
              ""
            )
          }
          backgroundColor={
            this.state.headerTitle == "Profile" ? "#1E4274" : "#fff"
          }
          containerStyle={{
            paddingHorizontal: "5%",
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.9,
            shadowRadius: 60,
            borderBottomColor: "transparent",
          }}
        />
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: "#fff",
            inactiveTintColor: "#fff",
            activeBackgroundColor: "#CD8930",
            labelStyle: {
              fontSize: 16,
            },
            tabStyle: {
              backgroundColor: "#1E4275",
              borderRadius: 150,
              justifyContent: "center",
              alignItems: "center",
              width: "99.9%",
              height: 63,
              alignSelf: "center",
            },
          }}
          appearance={{
            tabBarBackground: "#1E4275",
            shadow: true,
            floating: false,
            dotSize: "large",
            dotCornerRadius: 300,
          }}
        >
          <Tabs.Screen
            name="Explore"
            component={this.ExploreScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon color="#fff" name="home-outline" type="ionicon" />
              ),
            }}
          />
          <Tabs.Screen
            name="Activity"
            component={this.ActivityScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon color="#fff" name="md-pulse" type="ionicon" />
              ),
            }}
          />
          <Tabs.Screen
            name="Coaching"
            component={this.CareerCoachingScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon color="#fff" name="briefcase-outline" type="ionicon" />
              ),
            }}
          />
          <Tabs.Screen
            name="Notifications"
            component={this.NotificationScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon color="#fff" name="bell" type="font-awesome-5" />
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={this.ProfileScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  color="#fff"
                  name="person-circle-outline"
                  type="ionicon"
                />
              ),
            }}
          />
        </Tabs.Navigator>

        {this.state.headerTitle == "Profile" ? (
          <StatusBar style="light" animated={true} showHideTransition="slide" />
        ) : (
          <StatusBar style="dark" animated={true} showHideTransition="slide" />
        )}
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  drawer: {
    height: "100%",
    backgroundColor: "#fff",
  },
});

// stackNavigator.setOptions({
//   title: "Profile",
//   headerStyle: {
//     backgroundColor: "#1E4274",
//   },
//   cardOverlayEnabled: true,
//   headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
//   headerTitleStyle: {
//     fontWeight: "bold",
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: 20,
//   },
//   headerTintColor: "#fff",
//   headerLeft: () => (
//     <IconButton
//       icon="menu"
//       type="text"
//       size={40}
//       color="#fff"
//       onPress={() => {
//         this.state.drawerIsOpened == false
//           ? this.state.drawerRef.openDrawer()
//           : this.state.drawerRef.closeDrawer();
//       }}
//     />
//   ),
//   headerRight: () => (
//     <Feather
//       name="search"
//       size={28}
//       color="#fff"
//       style={{
//         marginRight: 20,
//       }}
//       onPress={() => {
//         this.props.navigation.navigate("Search");
//       }}
//     />
//   ),
// });
// stackNavigator.setOptions({
//   title: "Explore",
//   headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
//   cardOverlayEnabled: false,
//   headerStyle: {
//     backgroundColor: "#fff",
//   },
//   headerMode: "float",

//   headerTitleStyle: {
//     fontWeight: "bold",
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: 20,
//   },
//   headerTintColor: "#1E4274",
//   headerLeft: () => (
//     <IconButton
//       icon="menu"
//       type="text"
//       size={40}
//       color="#1E4274"
//       onPress={() => {
//         this.state.drawerIsOpened == false
//           ? this.state.drawerRef.openDrawer()
//           : this.state.drawerRef.closeDrawer();
//       }}
//     />
//   ),
//   headerRight: () => (
//     <Feather
//       name="search"
//       size={28}
//       color="#1E4274"
//       style={{
//         marginRight: 20,
//       }}
//       onPress={() => {
//         this.props.navigation.navigate("Search");
//       }}
//     />
//   ),
// });
