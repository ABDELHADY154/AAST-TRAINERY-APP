import React, { Component, useState, useEffect } from "react";

import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

import { useNavigation, useRoute } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native";

export default class CompanyProfile extends Component {
  state = {
    userData: {},
    loading: false,
    spinner: false,
    search: "",
  };
  updateSearch = (search) => {
    this.setState({ search });
  };

  async componentDidMount() {
    // await axios
    //   .get(`/W/student/company/${this.props.route.params.id}`)
    //   .then((response) => {
    //     this.setState({
    //       loading: true,
    //       spinner: false,
    //       id: response.data.response.data.id,
    //       userData: response.data.response.data,
    //     });
    //     // console.log(response.data.response.data);
    //     this.props.getUserData(this.state.userData);
    //   })
    //   .catch(function (error) {
    //     this.setState({
    //       spinner: false,
    //     });
    //     console.log(error.response.data.errors);
    //   });
  }

  render() {
    const { search } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Header */}
          <Spinner
            visible={this.state.spinner}
            cancelable={false}
            size="large"
            color="#1E4274"
            animation="fade"
            overlayColor="rgba(255, 255, 255, 0.8)"
            textStyle={{ color: "#1E4274", textAlign: "center" }}
          />
          <Feather
            name="chevron-left"
            size={36}
            color="#1E4274"
            style={{
              alignSelf: "flex-start",
              marginLeft: "5%",
              marginTop: "16%",
              marginBottom: 15,
            }}
            onPress={() => this.props.navigation.goBack()}
          />
          <SearchBar
            inputStyle={{ backgroundColor: "#fff" }}
            inputContainerStyle={{ backgroundColor: "#fff" }}
            containerStyle={{ backgroundColor: "#fff" }}
            lightTheme="light"
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export const App = () => {
  const modalizeRef = useRef < Modalize > null;

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>...your content</Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
