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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { List, RadioButton } from "react-native-paper";

import { Radio } from "galio-framework";
import { ActivityIndicator } from "react-native";

export default class SearchComp extends Component {
  state = {
    posts: [],
    loading: false,
    modalRef: Modalize,
    filterRef: Modalize,
    spinner: true,
    search: "",
    departments: [],
    dep: "",
    state: "",
    payment: "",
  };
  updateSearch = async search => {
    this.setState({ search: search });
    if (this.state.search.length + 1 > 3) {
      await axios
        .get(`/A/student/search/${search}`)
        .then(res => {
          this.setState({ posts: res.data.response.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  async componentDidMount() {
    this.setState({
      spinner: true,
    });
    await axios
      .get("departments")
      .then(response => {
        this.setState({
          departments: response.data.response.data,
          spinner: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          spinner: false,
        });
      });
  }

  depFilter = async id => {
    this.setState({
      dep: id,
    });

    const data = {
      department_id: id,
    };
    if (this.state.search.length + 1 > 3) {
      await axios
        .post(`/A/student/filterDep/${this.state.search}?page=1`, data)
        .then(res => {
          this.setState({ posts: res.data.response.data });
          this.state.filterRef.current?.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  stateFilter = async val => {
    this.setState({
      state: val,
    });

    const data = {
      state: val,
    };
    if (this.state.search.length + 1 > 3) {
      await axios
        .post(`/A/student/filterState/${this.state.search}?page=1`, data)
        .then(res => {
          this.setState({ posts: res.data.response.data });
          this.state.filterRef.current?.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  paymentFilter = async val => {
    this.setState({
      payment: val,
    });

    const data = {
      payment: val,
    };
    if (this.state.search.length + 1 > 3) {
      await axios
        .post(`/A/student/filterPay/${this.state.search}?page=1`, data)
        .then(res => {
          this.setState({ posts: res.data.response.data });
          this.state.filterRef.current?.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    const { search } = this.state;
    console.log(this.state.departments);
    return (
      // <SafeAreaView style={{ flex: 1 }}>
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
          accessible={true}
          //  accessibilityHint="Go back"
          accessibilityLabel="Go back"
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
          accessible={true}
          accessibilityRole="search"
          accessibilityLabel="Type somthing to search for"
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
            return (
              <Feather
                accessible={true}
                accessibilityRole="none"
                accessibilityLabel=" search icon"
                name="search"
                size={24}
                color="#1E4274"
              />
            );
          }}
          clearIcon={() => {
            return (
              <MaterialIcons
                accessible={true}
                accessibilityRole="search"
                accessibilityLabel=" delete search text"
                accessible={false}
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
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Filter by department, state and payment"
              onPress={() => {
                this.state.filterRef.current?.open();
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end",
                padding: 14,
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
              <FontAwesome name="filter" size={24} color="#1E4274" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View
          //   accessible={true}
          //   accessibilityRole="none"
          //   accessibilityLabel="search result"
          >
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
              <Text accessible={false}></Text>
            )}
          </View>
        </ScrollView>

        <Modalize ref={this.state.filterRef} snapPoint={500} modalHeight={500}>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text
              style={{
                color: "#1E4274",
                fontWeight: "500",
                fontSize: 20,
                marginTop: "10%",
                alignSelf: "flex-start",
                marginBottom: "3%",
              }}
            >
              Filter By
            </Text>
          </View>
          <List.Section
            accessible={true}
            accessibilityLabel="Filter by department, state and payment"
          >
            <List.Accordion
              accessible={true}
              accessibilityLabel="Filter by department"
              title="Department"
              right={props =>
                props.isExpanded == false ? (
                  <List.Icon {...props} icon="chevron-down" color="#1E4274" />
                ) : (
                  <List.Icon {...props} icon="chevron-up" color="#1E4274" />
                )
              }
              titleStyle={{
                color: "#1E4274",
                fontWeight: "400",
                fontSize: 16,
              }}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: "#E0E0E0",
                height: 75,
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityRole="radio"
                  accessibilityLabel="Filter by All departments"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    All
                  </Text>
                  <RadioButton.Android
                    accessible={true}
                    accessibilityRole="radio"
                    accessibilityLabel="Tab to check or unchecked"
                    color="#1E4274"
                    value=""
                    status={this.state.dep === "" ? "checked" : "unchecked"}
                    onPress={() => this.setState({ dep: "" })}
                  />
                </View>
              </View>
              {this.state.departments ? (
                this.state.departments.map(dep => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      key={dep.id}
                    >
                      <View
                        accessible={true}
                        accessibilityRole="radio"
                        accessibilityLabel={dep.dep_name}
                        accessibilityHint="Filter"
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "85%",
                          marginTop: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#1E4274",
                            fontWeight: "400",
                            fontSize: 16,
                          }}
                        >
                          {dep.dep_name}
                        </Text>
                        <RadioButton.Android
                          accessible={true}
                          accessibilityRole="radio"
                          accessibilityLabel={dep.dep_name}
                          accessibilityHint="Filter"
                          color="#1E4274"
                          value={dep.id}
                          status={
                            this.state.dep === dep.id ? "checked" : "unchecked"
                          }
                          onPress={() => this.depFilter(dep.id)}
                        />
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text></Text>
              )}
            </List.Accordion>
            <List.Accordion
              accessible={true}
              accessibilityLabel="Filter by State"
              title="State"
              right={props =>
                props.isExpanded == false ? (
                  <List.Icon {...props} icon="chevron-down" color="#1E4274" />
                ) : (
                  <List.Icon {...props} icon="chevron-up" color="#1E4274" />
                )
              }
              titleStyle={{
                color: "#1E4274",
                fontWeight: "400",
                fontSize: 16,
              }}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: "#E0E0E0",
                height: 75,
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityLabel="Filter by all States"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    All
                  </Text>
                  <RadioButton.Android
                    color="#1E4274"
                    value=""
                    status={this.state.state === "" ? "checked" : "unchecked"}
                    onPress={() => this.setState({ state: "" })}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityLabel="Filter by  Full Time State"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    Full Time
                  </Text>
                  <RadioButton.Android
                    color="#1E4274"
                    value="full time"
                    status={
                      this.state.state === "full time" ? "checked" : "unchecked"
                    }
                    onPress={() => this.stateFilter("full time")}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityLabel="Filter by  part Time State"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    Part Time
                  </Text>
                  <RadioButton.Android
                    color="#1E4274"
                    value="part time"
                    status={
                      this.state.state === "part time" ? "checked" : "unchecked"
                    }
                    onPress={() => this.stateFilter("part time")}
                  />
                </View>
              </View>
            </List.Accordion>
            <List.Accordion
              accessible={true}
              accessibilityLabel="Filter by Payment"
              title="Payment"
              right={props =>
                props.isExpanded == false ? (
                  <List.Icon {...props} icon="chevron-down" color="#1E4274" />
                ) : (
                  <List.Icon {...props} icon="chevron-up" color="#1E4274" />
                )
              }
              titleStyle={{
                color: "#1E4274",
                fontWeight: "400",
                fontSize: 16,
              }}
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: "#E0E0E0",
                height: 75,
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityLabel="Filter by All"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    All
                  </Text>
                  <RadioButton.Android
                    color="#1E4274"
                    value=""
                    status={this.state.payment === "" ? "checked" : "unchecked"}
                    onPress={() => this.setState({ payment: "" })}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityLabel="Filter by Paid Payment"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    Paid
                  </Text>
                  <RadioButton.Android
                    color="#1E4274"
                    value="Paid"
                    status={
                      this.state.payment === "Paid" ? "checked" : "unchecked"
                    }
                    onPress={() => this.paymentFilter("Paid")}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  accessible={true}
                  accessibilityLabel="Filter by unPaid"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "85%",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#1E4274",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    Un paid
                  </Text>
                  <RadioButton.Android
                    color="#1E4274"
                    value="un paid"
                    status={
                      this.state.payment === "un paid" ? "checked" : "unchecked"
                    }
                    onPress={() => this.paymentFilter("un paid")}
                  />
                </View>
              </View>
            </List.Accordion>
          </List.Section>
        </Modalize>
      </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
