import React, { Component, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Switch } from "react-native";
import { Button } from "galio-framework";
import { Feather } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { axios } from "../../Config/Axios";

export default class MySubscriptions extends Component {
  state = {
    isEnabled: false,
    spinner: false,
  };
  async componentDidMount() {
    this.setState({
      spinner: true,
    });
    await axios
      .get("/A/student/studentAccount")
      .then((res) => {
        this.setState({
          spinner: false,
          isEnabled: res.data.response.data.subscribed,
        });
      })
      .catch((err) => {
        this.setState({
          spinner: false,
        });
      });
  }
  handleSubmit = async (val) => {
    this.setState({ spinner: true });
    if (val == false) {
      await axios
        .get("/A/student/unsubscribe")
        .then((res) => {
          this.setState({
            spinner: false,
          });
        })
        .catch((err) => {
          this.setState({ spinner: false });
        });
    } else if (val == true) {
      await axios
        .get("/A/student/subscribe")
        .then((res) => {
          this.setState({
            spinner: false,
          });
        })
        .catch((err) => {
          this.setState({ spinner: false });
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
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
          accessibilityLabel="go back"
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "3%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: "5.4%",
            color: "#CD8930",
            fontSize: 24,
            fontFamily: "SF-M",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          My Subscriptions
        </Text>
        <ScrollView>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <View
              style={{
                borderBottomColor: "#1E4274",
                borderBottomWidth: 2,
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "#1E4274",
                  fontSize: 16,
                  fontFamily: "SF-M",
                  fontWeight: "normal",
                  marginBottom: -4,
                  marginTop: 15,
                  marginLeft: "1%",
                }}
              >
                Mail subscriptions for newsletter
              </Text>
              {/* <SwitchButton /> */}
              <View style={styles.container}>
                <Switch
                  trackColor={{
                    false: "#CCCCCC",
                    true: "#1E4274",
                  }}
                  thumbColor={this.state.isEnabled ? "#fff" : "#fff"}
                  ios_backgroundColor="#1E4274"
                  onValueChange={(e) => {
                    console.log(e);
                    this.setState({
                      isEnabled: e,
                    });
                    this.handleSubmit(e);
                  }}
                  value={this.state.isEnabled}
                />
              </View>
            </View>

            {/* <Button
              style={{ width: "auto", borderRadius: 50, marginTop: 40 }}
              color="#1E4275"
              // onPress={this.handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
            </Button> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
});
// const SwitchButton = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   return (
//     <View style={styles.container}>
//       <Switch
//         trackColor={{
//           false: "#CCCCCC",
//           true: "#1E4274",
//         }}
//         thumbColor={isEnabled ? "#fff" : "#fff"}
//         ios_backgroundColor="#1E4274"
//         onValueChange={toggleSwitch}
//         value={isEnabled}
//       />
//     </View>
//   );
// };
