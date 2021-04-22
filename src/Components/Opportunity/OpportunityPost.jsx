import React, { Component } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { ProfileImgLoader } from "../Loader/Loader";
import { Card, IconButton, Paragraph } from "react-native-paper";

import Swiper from "react-native-swiper";
import StarRating from "react-native-star-rating";
import Spinner from "react-native-loading-spinner-overlay";

class OpportunityPost extends Component {
  state = {
    userData: {},
    departments: [],
    requirements: [],

    loading: false,
    spinner: true,
  };
  refreshComponent = async () => {
    await axios
      .get(`/W/student/post/${this.props.route.params.id}`)
      .then(response => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
        });
        console.log(this.state.userData);
        this.props.getUserData(this.state.userData);
      })
      .catch(error => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  };
  async componentDidMount() {
    await axios
      .get(`/W/student/post/${this.props.route.params.id}`)
      .then(response => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
        });
        console.log(this.state.userData);
        this.props.getUserData(this.state.userData);
      })
      .catch(error => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  }
  savePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/save/${this.state.userData.id}`)
      .then(res => {
        console.log(res.data);
        this.refreshComponent();
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
      .post(`/A/student/unsave/${this.state.userData.id}`)
      .then(res => {
        console.log(res.data);
        this.refreshComponent();
      })
      .catch(err => {
        console.log(err);
      });
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
        {/* Header */}
        <Feather
          name="chevron-left"
          size={36}
          color="#1E4274"
          style={{
            alignSelf: "flex-start",
            marginLeft: "3%",
            marginTop: 45,
            marginBottom: 15,
          }}
          onPress={() =>
            this.props.navigation.push("App", { screen: "Explore" })
          }
        />
        <ScrollView>
          <View style={{ width: "98%" }}>
            <Card.Title
              style={{ marginLeft: 1 }}
              title={this.state.userData.title}
              titleStyle={{
                color: "#1E4274",
                fontSize: 18,
                fontWeight: "bold",
              }}
              subtitle={
                <>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#1E4274", fontSize: 16 }}>
                      {this.state.userData.company_name}
                      {"   "}
                    </Text>

                    {/* <Text style={{ color: "#CD8930", fontSize: 16 }}>BIS</Text> */}
                  </View>
                  <View style={{}}>
                    {this.state.userData.departments ? (
                      this.state.userData.departments.map(e => {
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
                </>
              }
              subtitleStyle={{
                fontSize: 16,
              }}
              left={props => (
                <Pressable
                  onPress={() => {
                    this.props.navigation.push("CompanyProfile", {
                      id: 10,
                    });
                  }}
                >
                  <Card.Cover
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 5,
                    }}
                    source={{ uri: this.state.userData.company_logo }}
                  />
                </Pressable>
              )}
              right={props =>
                this.state.userData.saved &&
                this.state.userData.saved == true ? (
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "5%",
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: "#1E4274",
                borderWidth: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                width: 90,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#1E4274", fontSize: 16 }}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginBottom: "3%",
                fontFamily: "SF-M",
              }}
            >
              Overview
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Published on:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.published_on}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Vacancy:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.vacancy}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Gender:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.gender}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Type:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.type}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Salary:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.salary}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "1%" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  marginRight: "3%",
                  fontWeight: "bold",
                }}
              >
                Application deadline:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.application_deadline}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "3%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#CD8930",
                  marginRight: "3%",
                  fontWeight: "bold",
                  fontFamily: "SF-M",
                }}
              >
                Location:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                }}
              >
                {this.state.userData.location}
                {/* {this.state.userData.location_url} */}
              </Text>
            </View>
            <View></View>
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginTop: "3%",
                fontFamily: "SF-M",
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#1E4274",
                marginRight: "3%",
                marginTop: "1%",
                lineHeight: 22,
              }}
            >
              {this.state.userData.description}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#CD8930",
                fontWeight: "bold",
                marginTop: "3%",
                fontFamily: "SF-M",
              }}
            >
              Requirements
            </Text>
            {this.state.userData.requirements ? (
              this.state.userData.requirements.map(e => {
                return (
                  <Requirements
                    key={e.id}
                    id={e.id}
                    req={e.req}
                    requirements={e.requirements}
                    navigation={this.props.navigation}
                    // style={{ flexDirection: "column" }}
                  />
                );
              })
            ) : (
              <Text></Text>
            )}
          </View>

          <Text
            style={{
              marginTop: "5%",
              marginLeft: "5%",
              fontFamily: "SF-M",
              fontSize: 20,
              color: "#CD8930",
              fontWeight: "bold",
            }}
          >
            Reviews
          </Text>
          <Swiper height={260} dotColor="#CCCCCC" activeDotColor="#CD8930">
            <OpportunityReview />
            <OpportunityReview />
            <OpportunityReview />
          </Swiper>

          <ReviewWrite />
        </ScrollView>
      </View>
    );
  }
}

export default OpportunityPost;

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text style={{ color: "#CD8930", fontSize: 16 }}>
          {this.props.dep_name}
          {"   "}
        </Text>
      </View>
    );
  }
}
class Requirements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Entypo
          name="dot-single"
          size={36}
          color="#1E4274"
          style={{ marginLeft: -10 }}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#1E4274",
            marginRight: "3%",
            marginTop: "1%",
            lineHeight: 22,
            width: "88%",
          }}
        >
          {this.props.req}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

class OpportunityReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Card
          style={{
            marginBottom: 10,
          }}
        >
          <Card.Content>
            <Paragraph
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "#1E4274",
                marginRight: "3%",
                marginTop: "1%",
                lineHeight: 22,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </Paragraph>
            <View
              style={{
                borderBottomColor: "#CD8930",
                borderBottomWidth: 2,
                width: "45%",
                alignSelf: "center",
                marginTop: "3%",
              }}
            />
            <View style={{ width: "100%" }}>
              <Card.Title
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  width: "100%",
                  alignContent: "center",
                }}
                title="Yasmin Sabry"
                titleStyle={{
                  margin: 0,
                  alignSelf: "center",
                  textAlign: "center",
                  textTransform: "capitalize",
                  marginLeft: "-4%",
                  color: "#1E4274",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                subtitle="Cv Writing"
                subtitleStyle={{
                  textTransform: "capitalize",
                  alignSelf: "center",
                  textAlign: "center",
                  color: "#1E4274",
                  marginLeft: "-4%",

                  fontSize: 14,
                }}
              />
            </View>
          </Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: "15%",
            }}
          >
            <StarRating
              fullStarColor={"#CD8930"}
              starSize={22}
              disabled={false}
              maxStars={5}
              rating={this.state.rating}
            />
          </View>
        </Card>
      </View>
    );
  }
}

class ReviewWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text
          style={{
            marginTop: "7%",
            alignSelf: "flex-start",
            marginLeft: "5%",
            color: "#1E4274",
            fontSize: 20,
            fontFamily: "SF-M",
            marginBottom: 10,
          }}
        >
          Add Your Review
        </Text>
        <View
          style={{
            alignSelf: "flex-start",
            marginLeft: "5%",
            marginTop: "-2%",
            marginBottom: "5%",
          }}
        >
          <StarRating
            fullStarColor={"#CD8930"}
            starSize={22}
            disabled={false}
            maxStars={5}
            rating={this.state.rating}
            selectedStar={value => this.setState({ rating: value })}
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          />
        </View>
        <View
          style={{
            marginTop: "1%",
          }}
        >
          <TextInput
            style={{
              alignSelf: "center",
              backgroundColor: "#f2f2f2",
              width: "93%",
              paddingTop: "1%",
              paddingLeft: "2%",
              paddingRight: "3%",
              paddingBottom: "15%",
            }}
            multiline={true}
            //   onChangeText={onChangeNumber}
            //   value={number}
            placeholder="Write Your Review..."
            placeholderTextColor="#1E4274"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: "3%",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "#1E4274",
              borderWidth: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              width: 90,
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#1E4274", fontSize: 16 }}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
