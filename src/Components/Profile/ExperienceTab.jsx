import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import {
  Card,
  Button,
  IconButton,
  Title,
  Paragraph,
  Chip,
} from "react-native-paper";
import StarRating from "react-native-star-rating";
import { useNavigation, useRoute } from "@react-navigation/native";

export function ExperienceTab(props) {
  const navigation = useNavigation();
  return <ExperienceTabForm navigation={navigation} {...props} />;
}
export class ExperienceTabForm extends Component {
  constructor() {
    super();
    this.state = {
      educations: [],
      work_experience: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("/A/student/get-profileExperience")
      .then((response) => {
        this.setState({
          educations: response.data.response.data.educations,
          work_experience: response.data.response.data.work_experience,
          courses: response.data.response.data.courses,
          skills: response.data.response.data.skills,
          interests: response.data.response.data.interests,
          languages: response.data.response.data.languages,
        });
        console.log(response.data.response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.container}>
              <ScrollView>
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
                      title="Education"
                      titleStyle={{
                        color: "#CD8930",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                      right={(props) => (
                        <IconButton
                          {...props}
                          icon="plus-box"
                          size={30}
                          color="#1E4274"
                          onPress={() => {
                            this.props.navigation.navigate("AccountForm");
                          }}
                        />
                      )}
                    />
                    {this.state.educations ? (
                      this.state.educations.map((e) => {
                        return (
                          <EducationCard
                            key={e.id}
                            id={e.id}
                            school_name={e.school_name}
                            city={e.city}
                            country={e.country}
                            from={e.from}
                            to={e.to}
                            navigation={this.props.navigation}
                          />
                        );
                      })
                    ) : (
                      <Text></Text>
                    )}
                  </Card>
                </View>
              </ScrollView>
            </View>
            {/* experiance */}
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
                  title="Work Experience"
                  titleStyle={{
                    color: "#CD8930",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {}}
                    />
                  )}
                />
                {this.state.work_experience ? (
                  this.state.work_experience.map((e) => {
                    return (
                      <ExperienceCard
                        key={e.id}
                        id={e.id}
                        job_title={e.job_title}
                        company_name={e.company_name}
                        company_website={e.company_website}
                        city={e.city}
                        country={e.country}
                        from={e.from}
                        to={e.to}
                        duration={e.duration}
                        experience_type={e.experience_type}
                        cred={e.cred}
                        cred_url={e.cred_url}
                        navigation={this.props.navigation}
                      />
                    );
                  })
                ) : (
                  <Text></Text>
                )}
              </Card>
            </View>
            {/* course */}
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
                  title="Courses"
                  titleStyle={{
                    color: "#CD8930",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {}}
                    />
                  )}
                />
                {this.state.courses ? (
                  this.state.courses.map((e) => {
                    return (
                      <CoursesCard
                        key={e.id}
                        id={e.id}
                        course_name={e.course_name}
                        course_provider={e.course_provider}
                        cred={e.cred}
                        cred_url={e.cred_url}
                        navigation={this.props.navigation}
                      />
                    );
                  })
                ) : (
                  <Text></Text>
                )}
              </Card>
            </View>
            {/* skills */}
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
                  title="Skills"
                  titleStyle={{
                    color: "#CD8930",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {
                        this.props.navigation.navigate("Skillinfo");
                      }}
                    />
                  )}
                />
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Octicons
                        name="primitive-dot"
                        size={24}
                        color="#CD8930"
                        style={{
                          justifyContent: "flex-start",
                          marginRight: 5,
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <Title
                          style={{
                            fontSize: 16,
                            color: "#1E4274",
                            fontWeight: "bold",

                            color: "#1E4274",
                            lineHeight: 19,
                          }}
                        >
                          Tools and Fields of Expertise
                        </Title>
                      </View>
                    </View>
                  </View>
                  {this.state.skills ? (
                    this.state.skills.map((e) => {
                      return (
                        <SkillsCard
                          key={e.id}
                          id={e.id}
                          skill_name={e.skill_name}
                          years_of_exp={e.years_of_exp}
                          navigation={this.props.navigation}
                        />
                      );
                    })
                  ) : (
                    <Text></Text>
                  )}
                </Card.Content>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Octicons
                        name="primitive-dot"
                        size={24}
                        color="#CD8930"
                        style={{
                          justifyContent: "flex-start",
                          marginRight: 5,
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <Title
                          style={{
                            fontSize: 16,
                            color: "#1E4274",
                            fontWeight: "bold",
                            flex: 1,
                            justifyContent: "flex-start",
                            color: "#1E4274",
                            lineHeight: 19,
                          }}
                        >
                          Intrests
                        </Title>
                      </View>
                    </View>
                    <MaterialIcons
                      name="mode-edit"
                      size={24}
                      color="#CD8930"
                      style={{ justifyContent: "flex-end" }}
                      onPress={() => {}}
                    />
                  </View>

                  {this.state.interests ? (
                    this.state.interests.map((e) => {
                      return (
                        <Interests
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "85%",
                          }}
                          key={e.id}
                          id={e.id}
                          interest={e.interest}
                          navigation={this.props.navigation}
                        />
                      );
                    })
                  ) : (
                    <Text></Text>
                  )}
                </Card.Content>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Octicons
                        name="primitive-dot"
                        size={24}
                        color="#CD8930"
                        style={{
                          justifyContent: "flex-start",
                          marginRight: 5,
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <Title
                          style={{
                            fontSize: 16,
                            color: "#1E4274",
                            fontWeight: "bold",

                            color: "#1E4274",
                            lineHeight: 19,
                          }}
                        >
                          Languages
                        </Title>
                      </View>
                    </View>
                  </View>
                  {this.state.languages ? (
                    this.state.languages.map((e) => {
                      return (
                        <Languages
                          key={e.id}
                          id={e.id}
                          language={e.language}
                          level={e.level}
                          navigation={this.props.navigation}
                        />
                      );
                    })
                  ) : (
                    <Text></Text>
                  )}
                </Card.Content>
              </Card>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export class EducationCard extends Component {
  render() {
    return (
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            <Octicons
              name="primitive-dot"
              size={24}
              color="#CD8930"
              style={{
                justifyContent: "flex-start",
                marginRight: 5,
              }}
            />
            <View
              style={{
                justifyContent: "flex-end",
                width: "85%",
              }}
            >
              <Title
                style={{
                  fontSize: 16,
                  color: "#1E4274",
                  fontWeight: "bold",
                  flex: 1,
                  justifyContent: "flex-start",
                  color: "#1E4274",
                  lineHeight: 19,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {this.props.school_name}
              </Title>
            </View>
          </View>
          <MaterialIcons
            name="mode-edit"
            size={24}
            color="#CD8930"
            style={{ justifyContent: "flex-end" }}
            onPress={() => {}}
          />
        </View>
        <View style={{ marginLeft: 18 }}>
          <Paragraph
            style={{
              // marginHorizontal: 23,
              fontSize: 14,
              color: "#1E4274",
              width: "85%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.props.city}, {this.props.country}
          </Paragraph>
          <Paragraph
            style={{
              // marginHorizontal: 23,
              fontSize: 14,
              color: "#1E4274",
            }}
          >
            {this.props.from} to {this.props.to}
          </Paragraph>
          <Button
            type="text"
            style={{
              fontSize: 14,
              alignItems: "flex-start",
              marginLeft: -16,
            }}
            onPress={() => {}}
            openURL={this.props.cred_url}
            color="#CD8930"
          >
            See credential
          </Button>
        </View>
      </Card.Content>
    );
  }
}
export class ExperienceCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-start",
                }}
              >
                <Octicons
                  name="primitive-dot"
                  size={24}
                  color="#CD8930"
                  style={{
                    justifyContent: "flex-start",
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    justifyContent: "flex-end",
                    width: "85%",
                  }}
                >
                  <Title
                    style={{
                      fontSize: 16,
                      color: "#1E4274",
                      fontWeight: "bold",
                      flex: 1,
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      color: "#1E4274",
                      lineHeight: 19,
                    }}
                  >
                    {this.props.job_title}
                  </Title>
                </View>
              </View>
              <MaterialIcons
                name="mode-edit"
                size={24}
                color="#CD8930"
                style={{ justifyContent: "flex-end" }}
                onPress={() => {}}
              />
            </View>
            <View style={{ marginLeft: 18 }}>
              <Paragraph
                style={{
                  // marginHorizontal: 23,
                  fontSize: 14,
                  color: "#1E4274",
                  width: "80%",
                  flexWrap: "wrap",
                }}
              >
                {this.props.city}, {this.props.country}
              </Paragraph>
              <Paragraph
                style={{
                  // marginHorizontal: 23,
                  fontSize: 14,
                  color: "#1E4274",
                }}
              >
                {this.props.from} to {this.props.to}
              </Paragraph>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Button
                  type="text"
                  style={{
                    fontSize: 14,
                    // flex: 1,
                    // justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginLeft: -16,
                  }}
                  onPress={() => {}}
                  color="#CD8930"
                >
                  See credential
                </Button>
                <Chip
                  style={{ height: 30 }}
                  textStyle={{
                    fontSize: 14,
                    color: "#1E4274",
                    // flex: 1,
                    // justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {this.props.experience_type}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </ScrollView>
      </View>
    );
  }
}
export class CoursesCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-start",
                }}
              >
                <Octicons
                  name="primitive-dot"
                  size={24}
                  color="#CD8930"
                  style={{
                    justifyContent: "flex-start",
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    justifyContent: "flex-end",
                    width: "85%",
                  }}
                >
                  <Title
                    style={{
                      fontSize: 16,
                      color: "#1E4274",
                      fontWeight: "bold",
                      flex: 1,
                      justifyContent: "flex-start",
                      color: "#1E4274",
                      lineHeight: 19,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {this.props.course_provider}
                  </Title>
                </View>
              </View>
              <MaterialIcons
                name="mode-edit"
                size={24}
                color="#CD8930"
                style={{ justifyContent: "flex-end" }}
                onPress={() => {}}
              />
            </View>
            <View style={{ marginLeft: 18 }}>
              <Paragraph
                style={{
                  // marginHorizontal: 23,
                  fontSize: 14,
                  color: "#1E4274",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "85%",
                }}
              >
                {this.props.course_name}
              </Paragraph>
              {/* <Paragraph
                    style={{
                      // marginHorizontal: 23,
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    Sep 2007 to Jun 2017
                  </Paragraph> */}
              <Button
                type="text"
                style={{
                  fontSize: 14,
                  alignItems: "flex-start",
                  marginLeft: -16,
                }}
                onPress={() => {}}
                color="#CD8930"
              >
                See credential
              </Button>
            </View>
          </Card.Content>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }
}
export class SkillsCard extends Component {
  render() {
    return (
      <View
        style={{
          // marginLeft: 18,
          flexDirection: "row",
        }}
      >
        <Paragraph
          style={{
            // marginHorizontal: 23,
            fontSize: 14,
            color: "#1E4274",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          {this.props.skill_name}
        </Paragraph>
        <MaterialIcons
          name="mode-edit"
          size={24}
          color="#CD8930"
          style={{ justifyContent: "flex-end" }}
          onPress={() => {
            this.props.navigation.navigate("Skillinfo");
          }}
        />
      </View>
    );
  }
}
export class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 18,
            flexDirection: "row",
            flexWrap: "wrap",
            margin: 4,
            // marginLeft: 0,
          }}
        >
          <Chip
            style={{ height: 30, marginRight: 6 }}
            textStyle={{
              fontSize: 14,
              color: "#1E4274",
              flexDirection: "row",
              flexWrap: "wrap",
            }} // onPress={() => console.log("Pressed")}
          >
            {this.props.interest}
          </Chip>
        </View>
      </View>
    );
  }
}
export class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              marginLeft: 18,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Paragraph
              style={{
                flex: 1,
                justifyContent: "flex-start",
                fontSize: 14,
                color: "#1E4274",
                alignItems: "flex-start",
              }}
            >
              {this.props.language}
            </Paragraph>

            <View>
              <StarRating
                fullStarColor={"#CD8930"}
                starSize={20}
                disabled={false}
                maxStars={5}
                rating={this.props.level}
                // selectedStar={this.props.level}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              {/* <StarRating
                    fullStarColor={"#CD8930"}
                    starSize={20}
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    style={{ flex: 1, justifyContent: "center" }}
                  /> */}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <MaterialIcons name="mode-edit" size={24} color="#CD8930" />
            </View>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }
}
