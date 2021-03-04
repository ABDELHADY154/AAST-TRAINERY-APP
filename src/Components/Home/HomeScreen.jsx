import { StatusBar } from "expo-status-bar";
import React, { Component, createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "galio-framework";
import Explore from "../Explore/ExploreScreen";
import Profile from "../Profile/Generalinfo/Generalinfo";
import Activity from "../Activity/ActivityScreen";
import CareerCoaching from "../CareerCoaching/CareerCoaching";
import Notification from "../Notification/Notification";
import { axios } from "../../Config/Axios";
import { Icon } from "react-native-elements";
import AnimatedTabBar from "@gorhom/animated-tabbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const AuthContext = React.createContext();

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
    };
  }

  ExploreScreen = props => {
    const navigation = useNavigation();
    const signOut = this.props.userSignOut;
    // console.log(signOut);userSignOut={signOut}

    return <Explore {...props} navigation={navigation} logout={signOut} />;
  };
  ProfileScreen = props => {
    const navigation = useNavigation();
    // const signOut = this.props.userSignOut; logout={signOut}
    // console.log(signOut);userSignOut={signOut}

    return <Profile {...props} navigation={navigation} />;
  };
  render() {
    // console.log(this.props.userSignOut());
    return (
      <Tab.Navigator
        tabBar={props => (
          <AnimatedTabBar
            tabs={tabs}
            {...props}
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
});
