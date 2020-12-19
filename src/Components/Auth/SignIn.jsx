import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

class SignInScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Username"
            // value={username}
            // onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="Sign in"
            // onPress={() => signIn({ username, password })}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}
export default function (props) {
  const navigation = useNavigation();

  return <SignInScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
