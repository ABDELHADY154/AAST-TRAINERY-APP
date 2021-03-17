import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import StarRating from "react-native-star-rating";

export default class Skillinfo extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      skill_name: "",
      years_of_exp: 0,
      skillIdErr: "",
      yearsExpErr: "",
      skillErr: "",
    };
  }

  async componentDidMount() {
    if (this.props.route.params.id !== 0) {
      await axios
        .get(`/A/student/profile/skill/${this.props.route.params.id}`)
        .then(res => {
          this.setState({
            id: res.data.response.data.id,
            skill_name: res.data.response.data.skill_name,
            years_of_exp: res.data.response.data.years_of_exp,
          });
        })
        .catch(error => {
          if (error.response.data.errors.years_of_exp) {
            this.setState({
              yearsExpErr: error.response.data.errors.years_of_exp,
            });
          }
          if (error.response.data.errors.skill_name) {
            this.setState({
              skillErr: error.response.data.errors.skill_name,
            });
          }
        });
    }
  }
  handleSubmitSkills = async () => {
    var body = {
      skill_name: this.state.skill_name,
      id: this.state.id,
      years_of_exp: this.state.years_of_exp,
    };
    if (this.props.route.params.id !== 0) {
      return await axios
        .put(`/A/student/profile/skill/${this.props.route.params.id}`, body)
        .then(res => {
          // this.props.navigation.push("App", { screen: "Profile" });
          this.props.navigation.push("App", {
            screen: "Profile",
            params: {
              screen: "Experience",
            },
          });
        })
        .catch(error => {
          if (error.response.data.errors.years_of_exp) {
            this.setState({
              yearsExpErr: error.response.data.errors.years_of_exp,
            });
          }
          if (error.response.data.errors.skill_name) {
            this.setState({
              skillErr: error.response.data.errors.skill_name,
            });
          }
        });
    } else {
      return await axios
        .post("/A/student/profile/skill", body)
        .then(response => {
          // this.props.navigation.push("App", { screen: "Profile" });
          this.props.navigation.push("App", {
            screen: "Profile",
            params: {
              screen: "Experience",
            },
          });
        })
        .catch(error => {
          if (error.response.data.errors.years_of_exp) {
            this.setState({
              yearsExpErr: error.response.data.errors.years_of_exp,
            });
          }
          if (error.response.data.errors.skill_name) {
            this.setState({
              skillErr: error.response.data.errors.skill_name,
            });
          }
        });
    }
  };
  handleDelete = async e => {
    await axios
      .delete(`/A/student/profile/skill/${this.props.route.params.id}`)
      .then(response => {
        // this.props.navigation.push("App", { screen: "Profile" });
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
      })
      .catch(error => {
        if (error.response.data.errors.years_of_exp) {
          this.setState({
            yearsExpErr: error.response.data.errors.years_of_exp,
          });
        }
        if (error.response.data.errors.skill_name) {
          this.setState({
            skillErr: error.response.data.errors.skill_name,
          });
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "6%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Skills </Text>

        <View style={{ flex: 1, width: "87%", alignSelf: "center" }}>
          <ScrollView>
            <Input
              containerStyle={{
                justifyContent: "center",
                alignSelf: "center",
                // marginLeft: "5%",
              }}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
                width: "107%",
              }}
              label="Skill Name"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
              }}
              value={this.state.skill_name}
              onChangeText={value => this.setState({ skill_name: value })}
            />
            {this.state.skillErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: -10,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.skillErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <View
              style={{
                width: "93%",
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: "5%",
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: 10,
                  marginTop: 15,
                }}
              >
                Level of Experience
              </Text>
              <StarRating
                fullStarColor={"#CD8930"}
                starSize={35}
                disabled={false}
                maxStars={5}
                rating={this.state.years_of_exp}
                selectedStar={years_of_exp =>
                  this.setState({ years_of_exp: years_of_exp })
                }
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginLeft: "5%",
                }}
              />
            </View>
            {this.state.yearsExpErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: -10,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.yearsExpErr}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <View
              style={{
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              {this.props.route.params.id !== 0 ? (
                <View>
                  <Button
                    style={styles.button}
                    color="#1E4275"
                    onPress={this.handleSubmitSkills}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
                  </Button>
                  <Button
                    style={{
                      border: 2,
                      borderColor: "#F44336",
                      borderWidth: 1,
                      width: "auto",
                      borderRadius: 50,
                      marginTop: 20,
                      backgroundColor: "#fff",
                    }}
                    color="#1E4275"
                    onPress={this.handleDelete}
                  >
                    <Text
                      style={{
                        color: "#F44336",
                        fontSize: 18,
                      }}
                    >
                      Delete
                    </Text>
                  </Button>
                </View>
              ) : (
                <View>
                  <Button
                    style={styles.button}
                    color="#1E4275"
                    onPress={this.handleSubmitSkills}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
                  </Button>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "97%",
    paddingRight: 15,
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "9%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
