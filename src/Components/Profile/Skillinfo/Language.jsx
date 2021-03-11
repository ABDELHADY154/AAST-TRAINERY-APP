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

export default function LanguageFormScreen(props) {
  const navigation = useNavigation();
  return <Language navigation={navigation} {...props} />;
}
class Language extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      language: "",
      level: 0,
      languageIdErr: "",
      languageErr: "",
      levelErr: "",
    };
  }

  componentDidMount() {
    axios
      .get("/A/student/profile/language")
      .then((res) => {
        this.setState({
          id: res.data.response.data.id,
          language: res.data.response.data.language,
          level: res.data.response.data.level,
        });
        console.log(response.data.response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSubmitSkills = () => {
    var body = {
      language: this.state.language,
      id: this.state.id,
      level: this.state.level,
    };
    axios
      .post("/A/student/profile/language", body)
      .then((response) => {
        this.setState({
          id: response.data.response.id,
          language: response.data.response.language,
          level: response.data.response.level,
        });
      })
      .catch((error) => {
        // console.log(error.response.data.errors);
        if (error.response.data.errors.id) {
          this.setState({
            languageIdErr: error.response.data.errors.id,
          });
        }
        if (error.response.data.errors.language) {
          this.setState({
            languageErr: error.response.data.errors.language,
          });
        }
        if (error.response.data.errors.level) {
          this.setState({
            levelErr: error.response.data.errors.level,
          });
        }
      });
  };

  render() {
    console.log(this.state.skill_name);
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}></SafeAreaView> */}

        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            marginTop: 45,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Language </Text>

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
              label="Language"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
              }}
              value={this.state.language}
              onChangeText={(value) => this.setState({ language: value })}
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
                  {this.state.languageErr}
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
                Level
              </Text>
              <StarRating
                fullStarColor={"#CD8930"}
                starSize={35}
                disabled={false}
                maxStars={5}
                rating={this.state.level}
                selectedStar={(value) => this.setState({ level: value })}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginLeft: "5%",
                }}
                // value={}
                // onChangeText={(value) => this.setState({ level: value })}
              />
            </View>

            {this.state.yearsExpErr != "" ? (
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
                  {this.state.levelErr}
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
                <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
              </Button>
              <Button
                style={styles.button}
                color="#1E4275"
                // onPress={this.submit}
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
                // onPress={this.handleDeleteSkills}
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
