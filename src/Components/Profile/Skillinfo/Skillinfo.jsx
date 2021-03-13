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
        .then((res) => {
          this.setState({
            id: res.data.response.data.id,
            skill_name: res.data.response.data.skill_name,
            years_of_exp: res.data.response.data.years_of_exp,
          });
          console.log(res.data.response.data.years_of_exp);
        })
        .catch((error) => {
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
    console.log(this.props.route.params.id);
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
        .then((res) => {
          this.props.navigation.push("App", { screen: "Profile" });
        })
        .catch((error) => {
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
        .then((response) => {
          this.setState(console.log(this.response.data));
        })
        .catch((error) => {
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
  handleDeleteSkills = async (e) => {
    await axios
      .delete(`/A/student/profile/skill/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({});
      })
      .catch((error) => {
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
    console.log(this.state.skill_name);
    return (
      <View style={styles.container}>
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            marginTop: 45,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Skills </Text>

        <View style={{ width: "93%" }}>
          <ScrollView>
            <Input
              containerStyle={{
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: "5%",
              }}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
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
              onChangeText={(value) => this.setState({ skill_name: value })}
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
            <Input
              containerStyle={{
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: "5%",
              }}
              // keyboardType="number-pad"
              keyboardType="number-pad"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Years of Experience "
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
              }}
              value={this.state.years_of_exp}
              onChangeText={(value) => this.setState({ years_of_exp: value })}
            />
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
                    // onPress={this.submit}
                  >
                    <Text
                      style={{ color: "white", fontSize: 18 }}
                      onPress={this.handleSubmitSkills}
                    >
                      Update
                    </Text>
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
                    onPress={this.handleDeleteSkills}
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
  },
  title: {
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
    marginLeft: "5%",
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
