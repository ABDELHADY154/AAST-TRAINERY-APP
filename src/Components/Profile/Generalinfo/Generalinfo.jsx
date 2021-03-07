import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import { Icon, Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Button } from "galio-framework";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

// import DatePicker from "react-native-datepicker";
// import { CountryPicker } from "react-native-country-picker-modal";
export default function GeneralInfoFormScreen(props) {
  const navigation = useNavigation();
  return <GeneralInfo navigation={navigation} {...props} />;
}
class GeneralInfo extends Component {
  // state = {
  //   studentName: "",
  //   gender: "",
  //   checked: "",
  //   dateOfBirth: "",
  //   nationality: "",
  //   country: "",
  //   city: "",
  //   phone_Number: "",
  // };
  // const [date, setDate] = useState(new Date(1598051730000));
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);
  constructor() {
    super();
    this.state = {
      date: new Date(1598051730000),
      mode: "date",
      show: false,
    };
  }

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
            marginRight: 350,
            // flex: 1,
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Personal Information</Text>

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
              label="Full Name"
              labelStyle={styles.labelStyle}
              // onChangeText={(value) => this.setState({ studentName: value })}
            />
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
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <RadioButton
                value="male"
                uncheckedColor="#1E4274"
                status={
                  this.state.checked === "first" ? "checked" : "unchecked"
                }
                color="#1E4274"
                // style={{ borderRadius: 5 }}
                onPress={() =>
                  this.setState({ checked: "first", gender: "male" })
                }
              />
              <Text
                style={{
                  color: "#1E4274",
                  marginRight: "10%",
                  marginTop: 8,
                }}
              >
                Male
              </Text>
              <RadioButton
                value="female"
                uncheckedColor="#1E4274"
                color="#1E4274"
                status={
                  this.state.checked === "second" ? "checked" : "unchecked"
                }
                onPress={() =>
                  this.setState({ checked: "second", gender: "female" })
                }
              />
              <Text
                style={{
                  color: "#1E4274",
                  marginTop: 8,
                }}
              >
                Female
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginTop: 15,
                  marginLeft: 10,
                  marginBottom: -20,
                }}
              >
                Date Of Birth
              </Text>
              <View>
                <View>
                  <Feather
                    onPress={this.showDatepicker}
                    name="calendar"
                    size={22}
                    color="#1E4274"
                    style={{
                      marginTop: 20,
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
                      marginTop: -30,
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
                label="Nationality"
                labelStyle={styles.labelStyle}
                onChangeText={(value) => this.setState({ nationality: value })}
              />
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
                  <Picker.Item label="Choose Your Country" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.country_name}
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
                  //   this.setState({ country: itemValue })
                  // }
                >
                  <Picker.Item label="Choose Your City" value="0" />
                  {/* {this.state.country.map((key) => {
                      return (
                        <Picker.Item
                          label={key.country_name}
                          value={key.id}
                          key={key.id}
                        />
                      );
                    })} */}
                </Picker>
              </View>
              <Input
                style={styles.input}
                keyboardType="number-pad"
                textAlign="left"
                inputStyle={{ color: "#1E4275" }}
                inputContainerStyle={{
                  borderColor: "#1E4275",
                  borderBottomWidth: 2,
                }}
                label="Phone Number"
                labelStyle={styles.labelStyle}
                // onChangeText={value => this.setState({ regNo: value })}
              />
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
    marginLeft: -140,
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
