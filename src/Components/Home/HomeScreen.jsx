import { StatusBar } from "expo-status-bar";
import React, { Component, useCallback } from "react";
import { StyleSheet, Text, View, Easing, Image } from "react-native";
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
    };
  }

  ExploreScreen = (props) => {
    const navigation = useNavigation();
    const signOut = this.props.userSignOut;
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          stackNavigator.setOptions({
            title: "Explore",
            headerStyle: {
              backgroundColor: "#fff",
            },

            headerTintColor: "#1E4274",
            headerLeft: () => (
              <IconButton
                icon="menu"
                type="text"
                size={40}
                color="#1E4274"
                onPress={() => {
                  this.state.drawerIsOpened == false
                    ? this.state.drawerRef.openDrawer()
                    : this.state.drawerRef.closeDrawer();
                }}
              />
            ),
            headerRight: () => (
              <Feather
                name="search"
                size={28}
                color="#1E4274"
                style={{
                  marginRight: 20,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Search");
                }}
              />
            ),
          });
        }
      }, [navigation])
    );

    return <Explore {...props} navigation={navigation} logout={signOut} />;
  };
  ProfileScreen = (props) => {
    const navigation = useNavigation();
    useFocusEffect(
      useCallback(() => {
        const stackNavigator = navigation.dangerouslyGetParent();
        if (stackNavigator) {
          stackNavigator.setOptions({
            title: "Profile",
            headerStyle: {
              backgroundColor: "#1E4274",
            },
            headerTintColor: "#fff",
            headerLeft: () => (
              <IconButton
                icon="menu"
                type="text"
                size={40}
                color="#fff"
                onPress={() => {
                  this.state.drawerIsOpened == false
                    ? this.state.drawerRef.openDrawer()
                    : this.state.drawerRef.closeDrawer();
                }}
              />
            ),
            headerRight: () => (
              <Feather
                name="search"
                size={28}
                color="#fff"
                style={{
                  marginRight: 20,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Search");
                }}
              />
            ),
          });
        }
      }, [navigation])
    );

    return <Profile {...props} navigation={navigation} />;
  };

  setDrawerRef = (ref) => {
    this.setState({ drawerRef: ref });
  };
  render() {
    var drawerContent = (
      <View>
        <View
          style={{
            height: "100%",
            backgroundColor: "#fff",
            // justifyContent: "center",
          }}
        >
          {/* <View style={{ backgroundColor: "#1e4274", height: 100 }}>
            <Avatar.Image
              style={{
                backgroundColor: "transparent",
              }}
              size={110}
              // source={{ uri: this.state.image }}
              source={{ uri: this.state.userData.image }}
            />
          </View> */}
          {/* <View>
            <Image
              source={require("../../assets/Images/logoBlue.png")}
              style={{
                width: 230,
                height: 50,
                // marginTop: 15,
                marginBottom: 5,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                color: "#1E4274",
                alignSelf: "center",
                marginBottom: 5,
                fontSize: 14,
              }}
            >
              Our Business Is Your Career
            </Text>
          </View> */}
          <View
            style={{
              backgroundColor: "#1E4274",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Feather
              name="edit"
              size={16}
              color="#fff"
              style={{ paddingRight: 7 }}
            />
            <Text style={{ color: "#fff", fontSize: 16 }}>Edit Profile</Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={20}
              color="#1E4274"
              style={{ paddingRight: 7 }}
            />
            <Text style={{ color: "#1E4274", fontSize: 16 }}>Generate CV</Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="edit"
              size={16}
              color="#1E4274"
              style={{ paddingRight: 7 }}
            />
            <Text style={{ color: "#1E4274", fontSize: 16 }}>Portfolio</Text>
            <FontAwesome
              name="dollar"
              size={15}
              color="#CD8930"
              style={{ paddingLeft: 7 }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="settings"
              size={16}
              color="#1E4274"
              style={{ paddingRight: 7 }}
            />
            <Text style={{ color: "#1E4274", fontSize: 16 }}>
              Account settings
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="info"
              size={16}
              color="#1E4274"
              style={{ paddingRight: 7 }}
            />
            <Text style={{ color: "#1E4274", fontSize: 16 }}>About Us</Text>
          </View>
          <Divider style={{ backgroundColor: "#ccc" }} />
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#1E4274", fontSize: 16 }}>Help center</Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#1E4274", fontSize: 16 }}>
              Terms and conditions
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#1E4274", fontSize: 16 }}
              onPress={() => {
                AsyncStorage.removeItem("userData");
                AsyncStorage.removeItem("userToken");
                AsyncStorage.removeItem("config");
                axios.defaults.headers.common["Authorization"] = ``;
                this.props.logout();
              }}
            >
              Log Out
            </Text>
          </View>
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
    return (
      <Drawer
        ref={this.setDrawerRef}
        style={styles.drawer}
        drawerWidth={300}
        drawerContent={drawerContent}
        type={Drawer.types.Replace}
        customStyles={{ drawer: customStyles.drawer }}
        drawerPosition={Drawer.positions.Left}
        onDrawerOpen={() => {
          this.setState({ drawerIsOpened: true });
        }}
        onDrawerClose={() => {
          this.setState({ drawerIsOpened: false });
        }}
        easingFunc={Easing.ease}
      >
        <Tab.Navigator
          shifting={true}
          tabBar={(props) => (
            <AnimatedTabBar
              tabs={tabs}
              {...props}
              duration={950}
              style={{
                backgroundColor: "#1E4275",
                borderRadius: 150,
                justifyContent: "center",
                alignItems: "center",
                width: "99.9%",
                height: 63,
                alignSelf: "center",
              }}
              itemOuterSpace={9}
              itemInnerSpace={7}
            />
          )}
        >
          <Tab.Screen name="Explore" component={this.ExploreScreen} />
          <Tab.Screen name="Activity" component={Activity} />
          <Tab.Screen name="Coaching" component={CareerCoaching} />
          <Tab.Screen name="Notifications" component={Notification} />
          <Tab.Screen name="Profile" component={this.ProfileScreen} />
        </Tab.Navigator>
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
