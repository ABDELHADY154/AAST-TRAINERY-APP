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
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  FontAwesome,
  Entypo,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { ProfileImgLoader } from "../Loader/Loader";
import { Card, IconButton, Paragraph, Modal, Portal } from "react-native-paper";

import Swiper from "react-native-swiper";
import StarRating from "react-native-star-rating";
import Spinner from "react-native-loading-spinner-overlay";

class OpportunityPost extends Component {
  state = {
    userData: {},
    Reviews: [],
    departments: [],
    requirements: [],
    comment: "",
    rate: 0,
    commentErr: "",
    rateErr: "",
    training_roleErr: "",
    loading: false,
    spinner: true,
  };
  refreshComponent = async () => {
    await axios
      .get(`/A/student/post/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
        });
        // console.log(this.state.userData);
        this.props.getUserData(this.state.userData);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
    await axios
      .get(`/A/student/review/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          Reviews: response.data.response.data,
        });
        console.log(this.state.Reviews);
        this.props.getUserData(this.state.Reviews);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  };
  async componentDidMount() {
    await axios
      .get(`/A/student/post/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
        });
        // console.log(this.state.userData);
        this.props.getUserData(this.state.userData);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
    await axios
      .get(`/A/student/review/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          Reviews: response.data.response.data,
        });
        console.log(this.state.Reviews);
        this.props.getUserData(this.state.Reviews);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  }
  refresh = async () => {
    await axios
      .get(`/A/student/post/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          userData: response.data.response.data,
        });
        // console.log(this.state.userData);
        this.props.getUserData(this.state.userData);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
    await axios
      .get(`/A/student/review/${this.props.route.params.id}`)
      .then((response) => {
        this.setState({
          loading: true,
          spinner: false,
          id: response.data.response.data.id,
          Reviews: response.data.response.data,
        });
        console.log(this.state.Reviews);
        this.props.getUserData(this.state.Reviews);
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        // console.log(error.response.data.errors);
      });
  };
  handleReview = async () => {
    this.setState({
      spinner: true,
    });
    var body = {
      comment: this.state.comment,
      rate: this.state.rate,
    };

    return await axios
      .post(`/A/student/review/${this.props.route.params.id}`, body)
      .then((response) => {
        this.refresh();
        this.setState({
          spinner: false,
        });
      })
      .catch((error) => {
        this.setState({
          spinner: false,
        });
        if (error.response.data) {
          this.setState({
            rateErr: error.response.data.errors.rate,
            commentErr: error.response.data.errors.comment,
          });
          console.log(error.response.data.errors);
        }
      });
  };
  savePost = async () => {
    this.setState({
      spinner: true,
    });
    axios
      .post(`/A/student/save/${this.state.userData.id}`)
      .then((res) => {
        console.log(res.data);
        this.refreshComponent();
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
      .post(`/A/student/unsave/${this.state.userData.id}`)
      .then((res) => {
        console.log(res.data);
        this.refreshComponent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  applyPost = async () => {
    this.setState({
      spinner: true,
    });
    await axios
      .post(`/A/student/apply/${this.state.userData.id}`)
      .then((res) => {
        console.log(res.data);
        this.refreshComponent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  unApply = async () => {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to cancel the applying for this opportunity?",
      [
        {
          text: "NO",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            this.setState({
              spinner: true,
            });
            await axios
              .post(`/A/student/unApply/${this.state.userData.id}`)
              .then((res) => {
                console.log(res.data);
                this.refreshComponent();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ]
    );
    return true;
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
          // onPress={() =>
          //   this.props.navigation.push("App", { screen: "Explore" })
          // }
          onPress={() => this.props.navigation.goBack()}
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
                  <View
                    style={{ flexDirection: "row" }}
                    accessible={true}
                    accessibilityLabel="go to company profile"
                    accessibilityHint={this.state.userData.company_name}
                  >
                    <Text
                      style={{
                        color: "#1E4274",
                        fontSize: 16,
                        flexWrap: "wrap",
                        textTransform: "capitalize",
                      }}
                      onPress={() => {
                        console.log(this.state.userData.company_id);
                        this.props.navigation.push("CompanyProfile", {
                          id: this.state.userData.company_id,
                        });
                      }}
                    >
                      {this.state.userData.company_name}
                      {"   "}
                    </Text>

                    {/* <Text style={{ color: "#CD8930", fontSize: 16 }}>BIS</Text> */}
                  </View>
                </>
              }
              subtitleStyle={{
                fontSize: 16,
              }}
              left={(props) => (
                <Pressable
                  accessible={true}
                  accessibilityLabel="go to company profile"
                  accessibilityHint={this.state.userData.company_name}
                  onPress={() => {
                    this.props.navigation.push("CompanyProfile", {
                      id: this.state.userData.company_id,
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
              right={(props) =>
                this.state.userData.saved &&
                this.state.userData.saved == true ? (
                  <IconButton
                    accessible={true}
                    accessibilityLabel="Tab to unsave"
                    accessibilityHint="unsave post to activity"
                    {...props}
                    icon="bookmark"
                    size={30}
                    color="#1E4274"
                    onPress={this.unSavePost}
                  />
                ) : (
                  <IconButton
                    accessible={true}
                    accessibilityLabel="Tab to save"
                    accessibilityHint="save post to activity"
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
            accessible={true}
            accessibilityLabel="related departments"
            style={{
              marginLeft: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 5,
            }}
          >
            {this.state.userData.departments ? (
              this.state.userData.departments.map((e) => {
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "5%",
            }}
          >
            {this.state.userData.status == "achieved" ? (
              <>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="opportunity achieved"
                  style={{
                    borderColor: "#1E4274",
                    backgroundColor: "#1E4274",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 90,
                    padding: 5,
                    borderRadius: 5,
                    flexDirection: "row",
                  }}
                  // onPress={this.unApply}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>Achieved</Text>
                </TouchableOpacity>
              </>
            ) : this.state.userData.status == "accepted" ? (
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="opportunity accepted"
                style={{
                  borderColor: "#1E4274",
                  backgroundColor: "#1E4274",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 90,
                  padding: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                }}
                // onPress={this.applyPost}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Accepted</Text>
              </TouchableOpacity>
            ) : this.state.userData.status == "applied" ? (
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="opportunity applied"
                accessibilityHint="tap to unApply"
                style={{
                  borderColor: "#1E4274",
                  backgroundColor: "#1E4274",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 90,
                  padding: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                }}
                onPress={this.unApply}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Applied</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                accessibilityLabel="tap to apply"
                style={{
                  borderColor: "#1E4274",
                  borderWidth: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: 90,
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={this.applyPost}
              >
                <Text style={{ color: "#1E4274", fontSize: 16 }}>Apply</Text>
              </TouchableOpacity>
            )}
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
            <View
              style={{ flexDirection: "row" }}
              accessible={true}
              accessibilityLabel="Published on:"
              accessibilityHint={this.state.userData.published_on}
            >
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
            <View
              style={{ flexDirection: "row", marginTop: "1%" }}
              accessible={true}
              accessibilityLabel={this.state.userData.vacancy}
              accessibilityHint={this.state.userData.vacancy}
            >
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
            <View
              style={{ flexDirection: "row", marginTop: "1%" }}
              accessible={true}
              accessibilityLabel="Gender:"
              accessibilityHint={this.state.userData.gender}
            >
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
            <View
              style={{ flexDirection: "row", marginTop: "1%" }}
              accessible={true}
              accessibilityLabel="Type:"
              accessibilityHint={this.state.userData.type}
            >
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
            <View
              style={{ flexDirection: "row", marginTop: "1%" }}
              accessible={true}
              accessibilityLabel="Salary:"
              accessibilityHint={this.state.userData.salary}
            >
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
            <View
              style={{ flexDirection: "row", marginTop: "1%" }}
              accessible={true}
              accessibilityLabel="   Application deadline:"
              accessibilityHint={this.state.userData.application_deadline}
            >
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
            <View
              style={{ flexDirection: "row", marginTop: "3%" }}
              accessible={true}
              accessibilityLabel="Location:"
              accessibilityHint={this.state.userData.location}
            >
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
              this.state.userData.requirements.map((e) => {
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

          <Swiper height={160} dotColor="#CCCCCC" activeDotColor="#CD8930">
            {this.state.Reviews.length == 0 ? (
              <View
                accessible={true}
                accessibilityLabel="No Reviews Were Added"
                accessibilityHint="achieve your opportunityto add your review"
              >
                <Text
                  style={{
                    marginLeft: "5%",
                    color: "#1E4274",
                    size: 18,
                    marginTop: "1%",
                    // marginBottom: "-10%",
                    // paddingBottom: "-10%",
                  }}
                >
                  No Reviews Were Added
                </Text>
              </View>
            ) : this.state.Reviews ? (
              this.state.Reviews.map((e) => {
                return (
                  <OpportunityReview
                    key={e.id}
                    id={e.id}
                    comment={e.comment}
                    fullName={e.fullName}
                    training_role={e.training_role}
                    rate={e.rate}
                    navigation={this.props.navigation}
                    // style={{ flexDirection: "column" }}
                  />
                );
              })
            ) : (
              <Text></Text>
            )}

            {/* {this.state.Reviews  ? (
              this.state.Reviews.map((e) => {
                return (
                  <OpportunityReview
                    key={e.id}
                    id={e.id}
                    comment={e.comment}
                    fullName={e.fullName}
                    training_role={e.training_role}
                    rate={e.rate}
                    navigation={this.props.navigation}
                    // style={{ flexDirection: "column" }}
                  />
                );
              })
            ) : (
              <View>
                <Text style={{}}>No Reviews Were Added</Text>
              </View>
            )} */}
          </Swiper>
          {this.state.userData.status == "achieved" ? (
            this.state.userData.reviewed == false ? (
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
                    // marginBottom: "5%",
                  }}
                >
                  <View
                    style={{ padding: 20, paddingLeft: 0, paddingTop: 0 }}
                    accessible={true}
                    accessibilityLabel="Rating start from 1 to 5"
                    accessibilityHint="rate your experience"
                  >
                    <StarRating
                      accessible={true}
                      accessibilityLabel={this.state.rate}
                      fullStarColor={"#CD8930"}
                      starSize={25}
                      disabled={false}
                      maxStars={5}
                      rating={this.state.rate}
                      selectedStar={(value) => this.setState({ rate: value })}
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        marginLeft: "5%",
                      }}
                    />
                  </View>
                  {this.state.rateErr != "" ? (
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignSelf: "center",
                        flexDirection: "row",
                        width: "91.5%",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#F44336",
                          fontSize: 14,
                          textAlign: "left",
                          marginLeft: "-1%",
                          textTransform: "capitalize",
                        }}
                      >
                        {this.state.rateErr}
                      </Text>
                    </View>
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View
                  style={
                    {
                      // marginTop: "1%",
                    }
                  }
                >
                  <TextInput
                    accessible={true}
                    accessibilityLabel="leave a comment "
                    accessibilityHint="describe your experience"
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
                    value={this.state.comment}
                    onChangeText={(value) => this.setState({ comment: value })}
                  />
                  {this.state.commentErr != "" ? (
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignSelf: "center",
                        flexDirection: "row",
                        width: "91.5%",
                        // marginTop: -10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#F44336",
                          fontSize: 14,
                          textAlign: "left",
                          marginLeft: "-1%",
                          textTransform: "capitalize",
                        }}
                      >
                        {this.state.commentErr}
                      </Text>
                    </View>
                  ) : (
                    <Text></Text>
                  )}
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
                    onPress={this.handleReview}
                  >
                    <Text style={{ color: "#1E4274", fontSize: 16 }}>
                      Review
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text></Text>
            )
          ) : (
            <Text></Text>
          )}

          {/* {this.state.data.reviewed == false ? <ReviewWrite /> : <Text></Text>} */}
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
      <View
        accessible={true}
        accessibilityLabel="related departments"
        accessibilityHint={this.props.dep_name}
      >
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
      <View
        style={{ flexDirection: "row" }}
        accessible={true}
        accessibilityLabel={this.props.req}
      >
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
              {this.props.comment}
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
                title={this.props.fullName}
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
                subtitle={this.props.training_role}
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
            accessible={true}
            accessibilityLabel={this.state.rate}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: "15%",
            }}
          >
            <StarRating
              accessible={true}
              accessibilityLabel={this.state.rate}
              fullStarColor={"#CD8930"}
              starSize={22}
              disabled={false}
              maxStars={5}
              rating={this.props.rate}
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
            accessible={true}
            accessibilityLabel={this.state.rate}
            accessibilityHint="rate your experience"
            fullStarColor={"#CD8930"}
            starSize={35}
            disabled={false}
            maxStars={5}
            rating={this.state.rate}
            selectedStar={(value) => this.setState({ rate: value })}
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginLeft: "5%",
            }}
          />
          {this.state.rateErr != "" ? (
            <View
              style={{
                justifyContent: "space-between",
                alignSelf: "center",
                flexDirection: "row",
                width: "91.5%",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginLeft: "-1%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.rateErr}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
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
            value={this.state.comment}
            onChangeText={(value) => this.setState({ comment: value })}
          />
          {this.state.commentErr != "" ? (
            <View
              style={{
                justifyContent: "space-between",
                alignSelf: "center",
                flexDirection: "row",
                width: "91.5%",
                marginTop: -10,
              }}
            >
              <Text
                style={{
                  color: "#F44336",
                  fontSize: 14,
                  textAlign: "left",
                  marginLeft: "-1%",
                  textTransform: "capitalize",
                }}
              >
                {this.state.commentErr}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
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
