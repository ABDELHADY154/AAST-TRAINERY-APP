import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { axios } from "../../Config/Axios";

import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export function OpportunityCardCompany(props) {
  const navigation = useNavigation();
  return <CompanyPost navigation={navigation} {...props} />;
}
class CompanyPost extends Component {
  state = {
    userData: {},
    departments: [],
    loading: false,
  };
  render() {
    // console.log(this.props.departments);
    return (
      <View>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#CCCCCC",
          }}
          // onPress={() => {
          //   this.props.navigation.navigate("CompanyProfile");
          // }}
        >
          <Card.Title
            style={{ marginLeft: 1 }}
            title={this.props.title}
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitle={
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {this.props.departments ? (
                  this.props.departments.map((e) => {
                    return (
                      <Departments
                        key={e.id}
                        id={e.id}
                        dep_name={e.dep_name}
                        departments={e.departments}
                        navigation={this.props.navigation}
                        // style={{ flexDirection: "column" }}
                      />
                    );
                  })
                ) : (
                  <Text></Text>
                )}
              </View>
            }
            subtitleStyle={{
              fontSize: 14,

              // marginBottom: 50,
            }}
            left={(props) => (
              <Card.Cover
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 5,
                }}
                source={{ uri: this.props.company_logo }}

                // source={{
                //   uri:
                //     "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                // }}
              />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="bookmark-outline"
                size={30}
                color="#1E4274"
                onPress={() => {}}
              />
            )}
          />
          <Card.Content>
            <Paragraph
              numberOfLines={4}
              style={{
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.description}
            </Paragraph>
          </Card.Content>
          <View
            style={{
              backgroundColor: "#CCCCCC",
              width: "90%",
              height: 1,
              marginVertical: 7,
              alignSelf: "center",
            }}
          ></View>
          <Card.Actions style={{ marginTop: -3 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#1E4274",
                marginLeft: 12,
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              Deadline {this.props.application_deadline}
            </Text>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text style={{ color: "#CD8930" }}>
          {this.props.dep_name}
          {"   "}
        </Text>
      </View>
    );
  }
}
