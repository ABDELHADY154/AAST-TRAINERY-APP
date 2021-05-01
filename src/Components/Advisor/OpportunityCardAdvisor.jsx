import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { axios } from "../../Config/Axios";
import { Card, IconButton, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export function OpportunityCardAdvisor(props) {
  const navigation = useNavigation();
  return <AdvisorPost navigation={navigation} {...props} />;
}
class AdvisorPost extends Component {
  state = {
    userData: {},
    departments: [],
    loading: false,
  };

  savePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/save/${this.props.item.id}`)
      .then((res) => {
        console.log(res.data);
        this.props.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  unSavePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/unsave/${this.props.item.id}`)
      .then((res) => {
        console.log(res.data);
        this.props.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
          onPress={() => {
            this.props.navigation.push("OpportunityPost", {
              id: this.props.item.id,
            });
          }}
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
            }}
            left={(props) => (
              <Card.Cover
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 5,
                }}
                source={{ uri: this.props.company_logo }}
              />
            )}
            right={(props) =>
              this.props.item.saved && this.props.item.saved == true ? (
                <IconButton
                  {...props}
                  icon="bookmark"
                  size={30}
                  color="#1E4274"
                  onPress={this.unSavePost}
                />
              ) : (
                <IconButton
                  {...props}
                  icon="bookmark-outline"
                  size={30}
                  color="#1E4274"
                  onPress={this.savePost}
                />
              )
            }
          />
          <Card.Content>
            <Paragraph
              numberOfLines={2}
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
