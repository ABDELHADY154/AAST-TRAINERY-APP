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
        // console.log(res.data);
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
        // console.log(res.data);
        this.props.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    // console.log(this.props.item.advisor.name);
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
            accessible={true}
            accessibilityLabel={this.props.item.title}
            accessibilityHint={this.props.item.company_name}
            accessibilityRole="text"
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
                  accessible={true}
                  accessibilityLabel="Saved post Tab to unsave"
                  // accessibilityHint=""
                  accessibilityRole="button"
                  {...props}
                  icon="bookmark"
                  size={33}
                  color="#1E4274"
                  onPress={this.unSavePost}
                />
              ) : (
                <IconButton
                  accessible={true}
                  accessibilityLabel="UnSaved post Tab to save"
                  // accessibilityHint="Tab to save"
                  accessibilityRole="button"
                  {...props}
                  icon="bookmark-outline"
                  size={33}
                  color="#1E4274"
                  onPress={this.savePost}
                />
              )
            }
          />
          <Card.Content
            accessible={false}
            accessibilityLabel="Tab for more detailes"

            // accessibilityRole="none"
            // accessibilityHint="Tap me"
          >
            <Paragraph
              numberOfLines={2}
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
                  accessible={true}
                  accessibilityLabel="Saved post Tab to unsave"
                  // accessibilityHint="Tab to unsave"
                  accessibilityRole="button"
                  {...props}
                  icon="bookmark"
                  size={33}
                  color="#1E4274"
                  onPress={this.unSavePost}
                />
              ) : (
                <IconButton
                  accessible={true}
                  accessibilityLabel="unSaved post Tab to save"
                  // accessibilityHint="Tab to save"
                  accessibilityRole="button"
                  {...props}
                  icon="bookmark-outline"
                  size={33}
                  color="#1E4274"
                  onPress={this.savePost}
                />
              )
            }
          />
          <Card.Content
            accessible={false}
            accessibilityLabel="Tab for more detailes"
          >
            {/* <Title>Card title</Title> */}
            <Paragraph
              numberOfLines={2}
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
                          // color: "#CD8930",
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
          <Card.Actions
            style={{ marginTop: -3 }}
            // accessible={true}
            // accessibilityLabel="post by the academic advisor"
            // accessibilityHint="Go to advisor profile"
          >
            <Pressable
              style={{ flexDirection: "row", flex: 1, paddingVertical: 6 }}
              // accessible={true}
              // accessibilityLabel="post by the academic advisor"
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
                {/* <Button> */}
                <Text
                  style={{
                    fontSize: 14,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#1E4274",
                    marginTop: 5,
                    marginLeft: 15,
                    marginBottom: 10,
                  }}
                  accessible={true}
                  accessibilityLabel="post by the academic advisor"
                  accessibilityHint={this.props.item.advisor.name}
                >
                  {this.props.item.advisor.name}
                </Text>
                {/* </Button> */}
                <Text
                  style={{
                    fontSize: 12,
                    color: "#1E4274",
                    marginLeft: 16,
                    marginTop: -7,
                    // alignItems: "flex-end",
                    // justifyContent: "flex-end",
                  }}
                  accessible={true}
                  accessibilityLabel="post deadline"
                  accessibilityHint={this.props.item.application_deadline}
                >
                  Deadline {this.props.item.application_deadline}
                </Text>
              </View>
            </Pressable>
          </Card.Actions>
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
                  accessible={true}
                  accessibilityLabel="Saved post Tab to unsave"
                  // accessibilityHint="Tab to unsave"
                  accessibilityRole="button"
                  {...props}
                  icon="bookmark"
                  size={33}
                  color="#1E4274"
                  onPress={this.unSavePost}
                />
              ) : (
                <IconButton
                  accessible={true}
                  accessibilityLabel="unSaved post Tab to save"
                  // accessibilityHint="Tab to save"
                  accessibilityRole="button"
                  {...props}
                  icon="bookmark-outline"
                  size={33}
                  color="#1E4274"
                  onPress={this.savePost}
                />
              )
            }
          />
          <Card.Content
            accessible={false}
            accessibilityLabel="Tab for more detailes"
          >
            {/* <Title>Card title</Title> */}
            <Paragraph
              numberOfLines={2}
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
                        {"    "}
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
          <Card.Actions
            style={{ marginTop: -3, marginLeft: 5, flex: 1 }}
            accessible={true}
          >
            <Feather
              name="arrow-up-right"
              size={35}
              color="#1E4274"
              style={{ flexDirection: "column" }}
            />
            <View
              style={{
                marginTop: -7,
                flexDirection: "column",
                justifyContent: "flex-start",
                marginLeft: 22,
              }}
            >
              <View
              // style={{ marginLeft: 10 }}
              >
                <Text
                  style={{
                    color: "#1E4274",
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                  accessible={true}
                  accessibilityLabel="promoted post by the company"
                  // accessibilityHint="save post to activity"
                  accessibilityRole="text"
                >
                  Promoted
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 12,
                  color: "#1E4274",
                  // marginLeft: 16,
                  marginTop: -3,
                }}
                accessible={true}
                accessibilityLabel="Deadline"
                accessibilityHint={this.props.item.application_deadline}
                accessibilityRole="text"
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
          <Card.Content
            accessible={false}
            accessibilityLabel="Tab for more detailes"
          >
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
          <Card.Actions
            style={{ marginTop: -3, marginLeft: 10 }}
            accessible={true}
            accessibilityLabel="Advertising post by the company"
            accessibilityRole="text"
          >
            <FontAwesome5 name="ad" size={24} color="#1E4274" />
          </Card.Actions>
        </Card>
      </View>
    ) : (
      <Text></Text>
    );
  }
}
