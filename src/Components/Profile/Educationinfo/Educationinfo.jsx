import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Button } from "galio-framework";
import { DocumentPicker } from "expo";
// import { CountryPicker } from "react-native-country-picker-modal";
export default class Academicinfo extends Component {
  // state = {
  //   SchoolName: "",
  //   countryname: "",
  //   cityname: "",
  //   EducationFrom: "",
  //   EducationTo: "",
  //   EducationCredURL: "",
  //   EducationCredUpload: "",
  // };
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };
  constructor(props) {
    super(props);
    this.state = { date: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}></SafeAreaView> */}

        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            marginRight: 340,
            // flex: 1,
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => navigation.push("SignIn")}
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
              <Text style={styles.gender}>Country</Text>
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
              {/* <DatePicker
                style={{ width: 370 }}
                date={this.state.EducationFrom}
                mode="date"
                placeholder="  "
                format="DD-MM-YYYY"
                minDate="01-01-1999"
                maxDate="01-01-2029"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                // iconSource={{
                //   uri:
                //     "https://https://react-icons.github.io/react-icons/icons?name=ai/AiOutlineCalendar",
                // }}
                customStyles={{
                  dateInput: {
                    marginLeft: 10,
                    borderColor: "transparent",
                    borderBottomColor: "#1E4274",
                    borderBottomWidth: 2,
                    color: "#1E4274",
                  },
                }}
                onDateChange={date => {
                  this.setState({ EducationFrom: date });
                }}
              /> */}
              <Text style={styles.gender}>To</Text>
              {/* <DatePicker
                style={{ width: 370 }}
                date={this.state.EducationTo}
                mode="date"
                placeholder="  "
                format="DD-MM-YYYY"
                minDate="01-01-1999"
                maxDate="01-01-2029"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                // iconSource={{
                //   uri:
                //     "https://https://react-icons.github.io/react-icons/icons?name=ai/AiOutlineCalendar",
                // }}
                customStyles={{
                  dateInput: {
                    marginLeft: 10,
                    borderColor: "transparent",
                    borderBottomColor: "#1E4274",
                    borderBottomWidth: 2,
                    color: "#1E4274",
                  },
                }}
                onDateChange={date => {
                  this.setState({ EducationTo: date });
                }}
              /> */}
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
                    height: "36%",
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
  },
  title: {
    marginLeft: -250,
    color: "#CD8930",
    fontSize: 24,
    fontFamily: "SF-M",
    marginBottom: 10,
  },

  inputContainer: {
    flex: 1,
    width: 380,
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
