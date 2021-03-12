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

//  function EduInfoFormScren(props) {
//   const navigation = useNavigation();
//   return <EduInfoForm navigation={navigation} {...props} />;
// }
// import { CountryPicker } from "react-native-country-picker-modal";
export default class EduInfoForm extends Component {
  // state = {
  //   SchoolName: "",
  //   countryname: "",
  //   cityname: "",
  //   EducationFrom: "",
  //   EducationTo: "",
  //   EducationCredURL: "",
  //   EducationCredUpload: "",
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
  showMode = currentMode => {
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
            marginRight: 310,
            // flex: 1,
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Education</Text>

        <View style={styles.inputContainer}>
          <ScrollView style={styles.scrollView}>
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
              label="School Name"
              labelStyle={styles.labelStyle}
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
                  marginLeft: -14,
                  marginBottom: -10,
                }}
              >
                Country
              </Text>
              <View style={styles.boxContainer}>
                <Picker
                  mode="dialog"
                  style={{
                    color: "#1E4275",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 10,
                    borderRadius: 0,
                  }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#1E4275" }}
                  placeholderIconColor="#1E4275"
                  itemStyle={{ backgroundColor: "#fff" }}
                  dropdownIconColor="#1E4275"
                  selectedValue={"EGYPT"}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   this.setState({ country: itemValue })
                  // }
                >
                  <Picker.Item label="Choose The Country" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.countryname}
                          value={key.id}
                          key={key.id}
                        />
                      );
                    })} */}
                </Picker>
              </View>
              <Text style={styles.gender}>City</Text>
              <View style={styles.boxContainer}>
                <Picker
                  mode="dialog"
                  style={{
                    color: "#1E4275",
                    borderColor: "#1E4275",
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 10,
                    borderRadius: 0,
                  }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#1E4275" }}
                  placeholderIconColor="#1E4275"
                  itemStyle={{ backgroundColor: "#fff" }}
                  dropdownIconColor="#1E4275"
                  selectedValue={"Alexandria"}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   this.setState({ city: itemValue })
                  // }
                >
                  <Picker.Item label="Choose The City" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.cityname}
                          value={key.id}
                          key={key.id}
                        />
                      );
                    })} */}
                </Picker>
              </View>
              <Text style={styles.gender}>From</Text>
              <View>
                <View>
                  <Feather
                    onPress={this.showDatepicker}
                    name="calendar"
                    size={22}
                    color="#1E4274"
                    style={{
                      marginTop: 10,
                      marginLeft: 277,
                    }}
                  ></Feather>
                  <Button
                    title={this.state.date}
                    onPress={this.showDatepicker}
                    color="transparent"
                    style={{
                      width: "110%",
                      marginLeft: 10,
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
                      marginTop: -35,
                      borderRadius: 0,

                      marginLeft: -17,
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
              <Text style={styles.gender}>To</Text>
              <View>
                <View>
                  <Feather
                    onPress={this.showDatepicker}
                    name="calendar"
                    size={22}
                    color="#1E4274"
                    style={{
                      marginTop: 10,
                      marginLeft: 277,
                    }}
                  ></Feather>
                  <Button
                    title={this.state.date}
                    onPress={this.showDatepicker}
                    color="transparent"
                    style={{
                      width: "110%",
                      marginLeft: 10,
                      borderColor: "transparent",
                      borderBottomColor: "#1E4274",
                      borderBottomWidth: 2,
                      borderRadius: 0,
                      marginTop: -35,
                      marginLeft: -17,
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
                  marginLeft: -29,
                  width: "118.2%",
                }}
                label="Credentials URL"
                labelStyle={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -10,
                  marginTop: 15,
                  marginLeft: -29,
                }}
                placeholder="https://www."
                placeholderTextColor="#1E4274"
                onChangeText={value =>
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
                    marginLeft: -20,
                  }}
                >
                  Credentials Upload{" "}
                </Text>
                <Button
                  style={{
                    borderRadius: 5,
                    width: "11%",
                    height: "36%",
                    marginTop: -4,
                    marginLeft: "52%",
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
  },
  title: {
    marginLeft: -215,
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
    marginLeft: -15,
  },
  boxContainer: {
    backgroundColor: "transparent",
    width: "109%",
    marginLeft: -15,
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
    alignItems: "center",
  },
});
