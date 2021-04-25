import React, { Component, useState, useEffect, useRef } from "react";

import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { Modalize } from "react-native-modalize";
import { useNavigation, useRoute } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native";
import Cards from "../Cards/Cards";
import { ScrollView } from "react-native-gesture-handler";

const Modal = () => {
  // const modalizeRef = useRef < Modalize > null;
  // const onOpen = () => {
  //   modalizeRef.current?.open();
  // };

  return (
    <>
      {/* <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity> */}

      <Modalize ref={modalizeRef}>
        <Text>hady</Text>
      </Modalize>
    </>
  );
};
export default class CompanyProfile extends Component {
  state = {
    posts: [],
    loading: false,
    modalRef: Modalize,
    filterRef: Modalize,
    spinner: false,
    search: "",
  };
  updateSearch = async search => {
    this.setState({ search: search });
    if (this.state.search.length + 1 > 3) {
      // console.log(search);
      await axios
        .get(`/A/student/search/${search}`)
        .then(res => {
          // console.log(res.data.response.data);
          this.setState({ posts: res.data.response.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
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
          {/* <Spinner
            visible={this.state.spinner}
            cancelable={false}
            size="large"
            color="#1E4274"
            animation="fade"
            overlayColor="rgba(255, 255, 255, 0.8)"
            textStyle={{ color: "#1E4274", textAlign: "center" }}
          /> */}
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
            inputStyle={{
              backgroundColor: "#fff",
              color: "#1E4274",
              alignSelf: "center",
            }}
            inputContainerStyle={{
              backgroundColor: "#fff",
              alignSelf: "center",
            }}
            containerStyle={{
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              width: "87%",
              alignSelf: "center",
              borderBottomColor: "#1E4274",
              borderBottomWidth: 2,
              marginBottom: "4%",
            }}
            cancelButtonTitle="Cancel"
            cancelButtonProps={{ color: "#1E4274" }}
            platform="default"
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            placeholderTextColor="#1E4274"
            searchIcon={() => {
              return <Feather name="search" size={24} color="#1E4274" />;
            }}
            clearIcon={() => {
              return (
                <MaterialIcons
                  name="clear"
                  size={24}
                  color="#1E4274"
                  onPress={() => {
                    this.setState({ search: "" });
                  }}
                />
              );
            }}
            returnKeyType="search"
          />
          <View
            style={{
              flexDirection: "row",
              width: "87%",
              justifyContent: "flex-end",
              alignItems: "center",
              alignSelf: "flex-end",
              marginRight: "5%",
              marginBottom: "3%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "3%",
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontWeight: "500",
                  fontSize: 15,
                  marginRight: "5%",
                }}
              >
                Sort By
              </Text>
              <MaterialIcons
                name="sort"
                size={24}
                onPress={() => {
                  this.state.modalRef.current?.open();
                }}
                color="#1E4274"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontWeight: "500",
                  fontSize: 15,
                  marginRight: "5%",
                }}
              >
                Filter By
              </Text>
              <FontAwesome
                name="filter"
                size={24}
                color="#1E4274"
                onPress={() => {
                  this.state.filterRef.current?.open();
                }}
              />
            </View>
          </View>
          <ScrollView>
            <View>
              {this.state.posts ? (
                this.state.posts.map(item => {
                  return (
                    <Cards
                      navigation={this.props.navigation}
                      item={item}
                      key={item.id}
                    />
                  );
                })
              ) : (
                <Text></Text>
              )}
            </View>
          </ScrollView>
          <Modalize ref={this.state.modalRef} snapPoint={500} modalHeight={500}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={{
                  color: "#1E4274",
                  fontWeight: "500",
                  fontSize: 20,
                  marginTop: "10%",
                  alignSelf: "flex-start",
                }}
              >
                Sort By
              </Text>
            </View>
          </Modalize>
          <Modalize
            ref={this.state.filterRef}
            snapPoint={500}
            modalHeight={500}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={{
                  color: "#1E4274",
                  fontWeight: "500",
                  fontSize: 20,
                  marginTop: "10%",
                  alignSelf: "flex-start",
                }}
              >
                Filter By
              </Text>
            </View>
          </Modalize>
        </View>
      </SafeAreaView>
    );
  }
}

// export const App = () => {
//   const modalizeRef = useRef < Modalize > null;

//   const onOpen = () => {
//     modalizeRef.current?.open();
//   };

//   return (
//     <>
//       <TouchableOpacity onPress={onOpen}>
//         <Text>Open the modal</Text>
//       </TouchableOpacity>

//       <Modalize ref={modalizeRef}>...your content</Modalize>
//     </>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
