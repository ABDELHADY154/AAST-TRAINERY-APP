import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { axios } from "../../../Config/Axios";
import TagInput from "react-native-tags-input";

export default class Interests extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      tag: "",
      tags: {
        tagsArray: [],
      },
      interestIdErr: "",
      interestErr: "",
    };
  }
  updateTagState = state => {
    this.setState({
      tags: state,
    });
  };
  async componentDidMount() {
    const interestArr = [];
    await axios
      .get("/A/student/profile/interest")
      .then(res => {
        res.data.response.data.forEach(element => {
          interestArr.push(element.interest);
        });
        this.setState({
          tags: {
            tagsArray: interestArr,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  handleSubmitSkills = async () => {
    const data = {
      interests: [],
    };

    this.state.tags.tagsArray.forEach(el => {
      data.interests.push({ interest: el });
    });

    await axios
      .put("/A/student/profile/interest", data)
      .then(res => {
        this.props.navigation.push("App", {
          screen: "Profile",
          params: {
            screen: "Experience",
          },
        });
        console.log(res.response.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    console.log(this.state);
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
        <Text style={styles.title}>Interests </Text>
        <View style={{ width: "93%" }}>
          <ScrollView>
            <TagInput
              placeholder="Tags..."
              tagStyle={{
                backgroundColor: "#fff",
                // borderColor: "#1E4275",
                // borderWidth: 1,
                // color: "#1E4275",
                // fill: "#1E4275",
              }}
              containerStyle={{ marginLeft: "5%" }}
              inputContainerStyle={{
                borderColor: "#1E4275",
                borderBottomWidth: 2,
                width: "100%",
              }}
              inputStyle={{ color: "#1E4275" }}
              label="Press comma or Enter to add a tag"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
              }}
              updateState={this.updateTagState}
              tags={this.state.tags}
              keysForTag={","}
            />
            {this.state.interestsErr != "" ? (
              <View
                style={{
                  justifyContent: "space-between",
                  alignSelf: "center",
                  flexDirection: "row",
                  width: "91.5%",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "#F44336",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  {this.state.interestErr}
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
              <Button
                style={styles.button}
                color="#1E4275"
                onPress={this.handleSubmitSkills}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Update</Text>
              </Button>
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
