import React, { Component } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { axios } from "../../Config/Axios";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  Card,
  Button,
  Avatar,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";

export default class CardComponent extends Component {
  state = {
    spinner: false,
  };
  savePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/save/${this.props.item.id}`)
      .then(res => {
        console.log(res.data);
        this.props.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  unSavePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/unsave/${this.props.item.id}`)
      .then(res => {
        console.log(res.data);
        this.props.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return this.props.item.post_type == "companyPost" ? (
      <View>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
            borderWidth: 1,
            marginBottom: 10,
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
            title={this.props.item.title}
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitle={
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#1E4274" }}>
                  {this.props.item.company_name}
                  {"   "}
                </Text>
              </View>
            }
            subtitleStyle={{
              color: "#1E4274",
              fontSize: 14,
              marginTop: -3,
            }}
            left={props => (
              <Card.Cover
                style={{ height: 45, width: 45, borderRadius: 5 }}
                source={{
                  uri: this.props.item.company_logo,
                }}
              />
            )}
            right={props =>
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
              numberOfLines={4}
              style={{
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.props.item.departments ? (
                this.props.item.departments.map(item => {
                  return (
                    <View
                      style={{
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          color: "#CD8930",
                        }}
                      >
                        {item.dep_name}
                        {"  "}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text></Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
    ) : this.props.item.post_type == "advisorPost" ? (
      <View>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
            borderWidth: 1,
            marginBottom: 10,
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
            title={this.props.item.title}
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitle={
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#1E4274" }}>
                  {this.props.item.company_name}
                  {"   "}
                </Text>
              </View>
            }
            subtitleStyle={{
              color: "#1E4274",
              fontSize: 14,
              marginTop: -3,
            }}
            left={props => (
              <Card.Cover
                style={{ height: 45, width: 45, borderRadius: 5 }}
                source={{
                  uri: this.props.item.company_logo,
                }}
              />
            )}
            right={props =>
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
            {/* <Title>Card title</Title> */}
            <Paragraph
              numberOfLines={4}
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.props.item.departments ? (
                this.props.item.departments.map(item => {
                  return (
                    <View
                      style={{
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          color: "#CD8930",
                        }}
                      >
                        {item.dep_name}
                        {"  "}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text></Text>
              )}
            </View>
          </Card.Content>
          <View
            style={{
              backgroundColor: "#CCCCCC",
              width: "90%",
              height: 1,
              marginVertical: 7,
              // marginHorizontal: 10,
              // alignItems: "center",
              alignSelf: "center",
            }}
          ></View>
          {/* <Card.Actions style={{ marginTop: -3 }}>
            <Pressable
              style={{ flexDirection: "row" }}
              onPress={() => {
                this.props.navigation.push("AdvisorProfile", {
                  id: this.props.item.advisor.id,
                });
              }}
            >
              <Card.Cover
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 7,
                  marginLeft: 10,
                }}
                source={{
                  uri: this.props.item.advisor.image,
                }}
              />
              <View style={{ marginTop: -7 }}>
                <Button>
                  <Text
                    style={{
                      fontSize: 14,
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: "#1E4274",
                      // marginTop: -6,
                    }}
                  >
                    {this.props.item.advisor.name}
                  </Text>
                </Button>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#1E4274",
                    marginLeft: 16,
                    marginTop: -7,
                    // alignItems: "flex-end",
                    // justifyContent: "flex-end",
                  }}
                >
                  Deadline {this.props.item.application_deadline}
                </Text>
              </View>
            </Pressable>
          </Card.Actions> */}
        </Card>
      </View>
    ) : this.props.item.post_type == "promotedPost" ? (
      <View>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
            borderWidth: 1,
            marginBottom: 10,
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
            title={this.props.item.title}
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitle={
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#1E4274" }}>
                  {this.props.item.company_name}
                  {"   "}
                </Text>
              </View>
            }
            subtitleStyle={{
              color: "#1E4274",
              fontSize: 14,
              marginTop: -3,
            }}
            left={props => (
              <Card.Cover
                style={{ height: 45, width: 45, borderRadius: 5 }}
                source={{
                  uri: this.props.item.company_logo,
                }}
              />
            )}
            right={props =>
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
            {/* <Title>Card title</Title> */}
            <Paragraph
              numberOfLines={4}
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.props.item.departments ? (
                this.props.item.departments.map(item => {
                  return (
                    <View
                      style={{
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          color: "#CD8930",
                        }}
                      >
                        {item.dep_name},{"  "}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text></Text>
              )}
            </View>
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
          <Card.Actions style={{ marginTop: -3, marginLeft: 5 }}>
            <Feather name="arrow-up-right" size={35} color="#1E4274" />

            <View style={{ marginTop: -7 }}>
              <Button style={{ marginLeft: -26 }}>
                <Text
                  style={{
                    fontSize: 14,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#1E4274",
                  }}
                >
                  Promoted
                </Text>
              </Button>

              <Text
                style={{
                  fontSize: 12,
                  color: "#1E4274",
                  marginLeft: 16,
                  marginTop: -3,
                }}
              >
                Deadline {this.props.item.application_deadline}
              </Text>
            </View>
          </Card.Actions>
        </Card>
      </View>
    ) : this.props.item.post_type == "adsPost" ? (
      <View>
        <Card
          style={{
            width: "95%",
            marginLeft: 9,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#CCCCCC",
          }}
        >
          <Card.Title
            style={{ marginLeft: 1 }}
            title={this.props.item.company_name}
            titleStyle={{
              color: "#1E4274",
              fontSize: 16,
              fontWeight: "bold",
            }}
            subtitleStyle={{
              color: "#CD8930",
              fontSize: 14,
              marginTop: -3,
            }}
            left={props => (
              <Card.Cover
                style={{ height: 45, width: 45, borderRadius: 5 }}
                source={{
                  uri: this.props.item.company_logo,
                }}
              />
            )}
          />
          <Card.Content>
            <Paragraph
              style={{
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
            <View style={{ marginVertical: 20 }}>
              <Card.Cover source={{ uri: this.props.item.sponsor_image }} />
            </View>
          </Card.Content>
          <View
            style={{
              backgroundColor: "#CCCCCC",
              width: "90%",
              height: 1,
              marginVertical: 5,
              alignSelf: "center",
            }}
          ></View>
          <Card.Actions style={{ marginTop: -3, marginLeft: 10 }}>
            <FontAwesome5 name="ad" size={24} color="#1E4274" />
          </Card.Actions>
        </Card>
      </View>
    ) : (
      <Text></Text>
    );
  }
}
