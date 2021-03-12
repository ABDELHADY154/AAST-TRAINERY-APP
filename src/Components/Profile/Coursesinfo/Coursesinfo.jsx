import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Button } from "galio-framework";
import { DocumentPicker } from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

export default function CoursesInfoFormscreen(props) {
  const navigation = useNavigation();
  return <CoursesInfoForm navigation={navigation} {...props} />;
}
// import { CountryPicker } from "react-native-country-picker-modal";
class CoursesInfoForm extends Component {
  // state = {
  // needs update  StudentExperienceType: "",
  //   StudentExperienceJobTitle: "",
  //   StudentExperienceCompany: "",
  //   StudentExperienceCountry: "",
  //   StudentExperiencecity: "",
  //   StudentExperienceFrom: "",
  //   StudentExperienceTo: "",
  //   StudentExperienceCredUrl: "",
  //   StudentExperienceCredUpload: "",

  // };
  constructor() {
    super();
    this.state = {
      date: new Date(1598051730000),
      mode: "date",
      show: false,
    };
  }
  _pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      alert(result.uri);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  onChange = (e, selectedDate) => {
    try {
      const currentDate = selectedDate || this.state.date;
      this.setState({ show: Platform.OS === "ios" });
      this.setState({ date: currentDate });
    } catch (error) {
      console.log(error);
    }
  };
  showMode = (currentMode) => {
    this.setState({ show: true });
    this.setState({ mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}></SafeAreaView> */}

        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "6%",

            marginTop: "20%",
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Courses</Text>

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
              label="Course Name"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: 15,
              }}
              //value={this.state.coursename}
              //onChangeText={(value) => this.setState({ coursename: value })}
            />
            <Input
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Course Provider"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginTop: -10,
                marginBottom: -10,
              }}
              // onChangeText={(value) => this.setState({ SchoolName: value })}
            />
            <Input
              style={styles.input}
              autoCompleteType="name"
              textContentType="name"
              keyboardType="default"
              textAlign="left"
              inputStyle={{ color: "#1E4274" }}
              inputContainerStyle={{
                borderColor: "#1E4274",
                borderBottomWidth: 2,
              }}
              label="Company Name"
              labelStyle={{
                color: "#1E4274",
                fontSize: 16,
                fontFamily: "SF-M",
                fontWeight: "normal",
                marginBottom: -10,
                marginTop: -10,
              }}
              // onChangeText={(value) => this.setState({ SchoolName: value })}
            />
            <View style={styles.inputContainer}>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: -10,
                  marginLeft: 10,
                  marginBottom: -10,
                }}
              >
                From
              </Text>
              <View>
                <View>
                  <Feather
                    onPress={this.showDatepicker}
                    name="calendar"
                    size={22}
                    color="#1E4274"
                    style={{
                      marginTop: 10,
                      marginLeft: 340,
                    }}
                  ></Feather>
                  <Button
                    title={this.state.date}
                    onPress={this.showDatepicker}
                    color="transparent"
                    style={{
                      width: 360,
                      marginLeft: 10,
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
                      marginTop: -35,
                    }}
                  />
                </View>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
              </View>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: -10,
                }}
              >
                To
              </Text>
              <View>
                <View>
                  <Feather
                    onPress={this.showDatepicker}
                    name="calendar"
                    size={22}
                    color="#1E4274"
                    style={{
                      marginTop: 10,
                      marginLeft: 340,
                    }}
                  ></Feather>
                  <Button
                    title={this.state.date}
                    onPress={this.showDatepicker}
                    color="transparent"
                    style={{
                      width: 360,
                      marginLeft: 10,
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
                      marginTop: -35,
                    }}
                  />
                </View>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
              </View>
              <Input
                style={styles.input}
                textContentType="name"
                keyboardType="default"
                textAlign="left"
                inputStyle={{ color: "#1E4274" }}
                inputContainerStyle={{
                  borderColor: "#1E4274",
                  borderBottomWidth: 2,
                }}
                label="Credentials URL"
                labelStyle={styles.labelStyle}
                placeholder="https://www."
                placeholderTextColor="#1E4274"
                onChangeText={(value) =>
                  this.setState({ EducationCredURL: value })
                }
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#1E4274",
                    fontSize: 16,
                    fontFamily: "SF-M",
                    fontWeight: "normal",
                    marginBottom: 5,
                    marginLeft: 10,
                  }}
                >
                  Credentials Upload{" "}
                </Text>
                <Button
                  style={{
                    borderRadius: 5,
                    width: "10%",
                    height: "46%",
                    marginTop: -4,
                    marginLeft: "49%",
                  }}
                  color="#1E4275"
                  onPress={this._pickDocument}
                  // onPress={this.submit}
                >
                  <Feather name="upload" size={20} color="#fff" />
                </Button>
              </View>
            </View>
            <Button
              style={styles.button}
              color="#1E4275"
              // onPress={this.submit}
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
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: "9%",
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: "87%",
    alignSelf: "center",
  },
  labelStyle: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginBottom: -10,
    marginTop: 15,
  },
  input: {
    backgroundColor: "transparent",
    height: 35,
  },
  gender: {
    color: "#1E4274",
    fontSize: 16,
    fontFamily: "SF-M",
    fontWeight: "normal",
    marginTop: 15,
    marginLeft: 10,
  },
  boxContainer: {
    backgroundColor: "transparent",
    width: 360,
    marginLeft: 10,
    // marginTop: 10,
    borderColor: "#1E4275",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    // marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    width: "auto",
    borderRadius: 50,
    marginTop: 40,
  },
});
