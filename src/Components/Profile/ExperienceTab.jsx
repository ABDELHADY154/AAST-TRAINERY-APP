import React, { Component, useState, useEffect } from "react";
import { axios } from "../../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ScrollView, Text, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Octicons, Ionicons } from "@expo/vector-icons";
import {
  Card,
  Button,
  IconButton,
  Title,
  Paragraph,
  Chip,
} from "react-native-paper";
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";

export default function ExperiencForm(props) {
  const navigation = useNavigation();
  return <ExperienceTab navigation={navigation} {...props} />;
}
export class ExperienceTab extends Component {
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
                    accessible={true}
                    accessibilityLabel="Education achievement"
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
                          accessible={true}
                          accessibilityLabel="add new Education "
                          {...props}
                          icon="plus-box"
                          size={30}
                          color="#1E4274"
                          onPress={() => {
                            this.props.navigation.push("EducationForm", {
                              id: 0,
                            });
                          }}
                        />
                      )}
                    />
                    {this.state.educations ? (
                      this.state.educations.map((e) => {
                        return (
                          <EducationCard
                            accessible={true}
                            accessibilityLabel="Education achievement"
                            key={e.id}
                            id={e.id}
                            school_name={e.school_name}
                            city={e.city}
                            country={e.country}
                            from={e.from}
                            to={e.to}
                            cred={e.credential}
                            cred_url={e.credential_url}
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
                accessible={true}
                accessibilityLabel="Work Experience achievement"
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
                      accessible={true}
                      accessibilityLabel="add new Work Experience "
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {
                        this.props.navigation.push("ExperienceForm", {
                          id: 0,
                        });
                      }}
                    />
                  )}
                />
                {this.state.work_experience ? (
                  this.state.work_experience.map((e) => {
                    return (
                      <ExperienceCard
                        accessible={true}
                        accessibilityLabel="Work Experience achievement"
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
                accessible={true}
                accessibilityLabel="Courses achievement"
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
                      accessible={true}
                      accessibilityLabel="add new Course "
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {
                        this.props.navigation.push("CoursesForm", {
                          id: 0,
                        });
                      }}
                    />
                  )}
                />
                {this.state.courses ? (
                  this.state.courses.map((e) => {
                    return (
                      <CoursesCard
                        accessible={true}
                        accessibilityLabel="Courses achievement"
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
                accessible={true}
                accessibilityLabel="Skills"
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
                      accessible={true}
                      accessibilityLabel="add new Skills "
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {
                        this.props.navigation.push("Skillinfo", { id: 0 });
                      }}
                    />
                  )}
                />
                <Card.Content>
                  {/* {this.state.skills ? (
                  this.state.skills.map((e) => {
                    return (
                      <SkillsCard
                        key={e.id}
                        id={e.id}
                        skill_name={e.skill_name}
                        years_of_exp={e.years_of_exp}
                        navigation={this.props.navigation}
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
                  </View> */}
                  {this.state.skills ? (
                    this.state.skills.map((e) => {
                      return (
                        <SkillsCard
                          accessible={true}
                          accessibilityLabel="Skills"
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

                <Card.Title
                  accessible={true}
                  accessibilityLabel="Interests"
                  style={{ marginLeft: 1 }}
                  title="Interests"
                  titleStyle={{
                    color: "#CD8930",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  right={(props) => (
                    <IconButton
                      accessible={true}
                      accessibilityLabel="add and edit Interests "
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {
                        this.props.navigation.push("Interests", { id: 0 });
                      }}
                    />
                  )}
                />
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginTop: -5,
                    }}
                  ></View>
                  <View style={{ flex: 1 }}>
                    {this.state.interests ? (
                      <View
                        style={{
                          flexWrap: "wrap",
                          flexDirection: "row",
                        }}
                      >
                        {this.state.interests.map((e) => {
                          return (
                            <Interests
                              accessible={true}
                              accessibilityLabel="Interests"
                              key={e.id}
                              id={e.id}
                              interest={e.interest}
                              navigation={this.props.navigation}
                            />
                          );
                        })}
                      </View>
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                </Card.Content>
                <Card.Title
                  accessible={true}
                  accessibilityLabel="Languages"
                  style={{ marginLeft: 1 }}
                  title="Languages"
                  titleStyle={{
                    color: "#CD8930",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  right={(props) => (
                    <IconButton
                      accessible={true}
                      accessibilityLabel="add new Languages "
                      {...props}
                      icon="plus-box"
                      size={30}
                      color="#1E4274"
                      onPress={() => {
                        this.props.navigation.push("Language", { id: 0 });
                      }}
                    />
                  )}
                />
                <Card.Content style={{ marginLeft: -15 }}>
                  {this.state.languages ? (
                    this.state.languages.map((e) => {
                      return (
                        <Languages
                          accessible={true}
                          accessibilityLabel="Languages"
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

export function EducationCard(props) {
  const navigation = useNavigation();
  return <EducationCardSample navigation={navigation} {...props} />;
}
export class EducationCardSample extends Component {
  render() {
    return (
      <Card.Content
        accessible={true}
        accessibilityLabel={this.props.school_name}
      >
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
          <View
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            accessible={true}
            accessibilityLabel="edit details of "
            accessibilityHint={this.props.school_name}
          >
            <MaterialIcons
              name="mode-edit"
              size={24}
              color="#CD8930"
              style={{ justifyContent: "flex-end" }}
              onPress={() => {
                this.props.navigation.push("EducationForm", {
                  id: this.props.id,
                });
              }}
            />
          </View>
        </View>
        <View style={{ marginLeft: 18 }}>
          <Paragraph
            accessible={true}
            accessibilityLabel={this.props.city}
            accessibilityHint={this.props.country}
            style={{
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
            accessible={true}
            accessibilityLabel={this.props.from}
            accessibilityHint={this.props.to}
            style={{
              fontSize: 14,
              color: "#1E4274",
            }}
          >
            {this.props.from} to {this.props.to}
          </Paragraph>
          <View style={{ flexDirection: "row" }}>
            {this.props.cred_url !== null ? (
              <Button
                accessible={true}
                accessibilityLabel="navigate to credential PDF"
                type="text"
                style={{
                  fontSize: 14,
                  marginLeft: -16,
                  justifyContent: "center",
                }}
                color="#CD8930"
                onPress={() => {
                  Linking.openURL(this.props.cred_url);
                }}
              >
                See credential
              </Button>
            ) : (
              <Text></Text>
            )}

            {this.props.cred !== null ? (
              <IconButton
                accessible={true}
                accessibilityLabel="navigate to credential URL"
                style={{
                  marginTop: "1%",
                  justifyContent: "center",
                  marginLeft: this.props.cred_url !== null ? "20%" : 0,
                }}
                icon="file-document-outline"
                size={26}
                color="#CD8930"
                onPress={() => {
                  Linking.openURL(this.props.cred);
                }}
              />
            ) : (
              <Text></Text>
            )}
          </View>
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
          <Card.Content
            accessible={true}
            accessibilityLabel={this.props.job_title}
          >
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
              <View
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                accessible={true}
                accessibilityLabel="edit details of "
                accessibilityHint={this.props.job_title}
              >
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  style={{ justifyContent: "flex-end" }}
                  onPress={() => {
                    this.props.navigation.push("ExperienceForm", {
                      id: this.props.id,
                    });
                  }}
                />
              </View>
            </View>
            <View style={{ marginLeft: 18 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "flex-start", flex: 1 }}>
                  <Paragraph
                    accessible={true}
                    accessibilityLabel={this.props.city}
                    accessibilityHint={this.props.country}
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                      width: "80%",
                      flexWrap: "wrap",
                    }}
                  >
                    {this.props.city}, {this.props.country}
                  </Paragraph>
                  <Paragraph
                    accessible={true}
                    accessibilityLabel={this.props.from}
                    accessibilityHint={this.props.to}
                    style={{
                      fontSize: 14,
                      color: "#1E4274",
                    }}
                  >
                    {this.props.from} to {this.props.to}
                  </Paragraph>
                </View>
                <View
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Chip
                    accessible={true}
                    accessibilityLabel={this.props.experience_type}
                    accessibilityHint={this.props.experience_type}
                    style={{ height: 25 }}
                    textStyle={{
                      fontSize: 12,
                      color: "#1E4274",
                      marginTop: "1.5%",
                    }}
                  >
                    {this.props.experience_type}
                  </Chip>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                {this.props.cred_url !== null ? (
                  <Button
                    accessible={true}
                    accessibilityLabel="navigate to credential PDF"
                    type="text"
                    style={{
                      fontSize: 14,
                      marginLeft: -16,
                      justifyContent: "center",
                    }}
                    color="#CD8930"
                    onPress={() => {
                      Linking.openURL(this.props.cred_url);
                    }}
                  >
                    See credential
                  </Button>
                ) : (
                  <Text></Text>
                )}

                {this.props.cred !== null ? (
                  <IconButton
                    accessible={true}
                    accessibilityLabel="navigate to credential URL"
                    style={{
                      marginTop: "1%",
                      justifyContent: "center",
                      marginLeft: this.props.cred_url !== null ? "20%" : 0,
                    }}
                    icon="file-document-outline"
                    size={26}
                    color="#CD8930"
                    onPress={() => {
                      Linking.openURL(this.props.cred);
                    }}
                  />
                ) : (
                  <Text></Text>
                )}
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
          <Card.Content
            accessible={true}
            accessibilityLabel={this.props.course_name}
          >
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
                    // width: "95%",
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
              <View
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                accessible={true}
                accessibilityLabel="edit details of "
                accessibilityHint={this.props.course_name}
              >
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="#CD8930"
                  style={{ justifyContent: "flex-end" }}
                  onPress={() => {
                    this.props.navigation.push("CoursesForm", {
                      id: this.props.id,
                    });
                  }}
                />
              </View>
            </View>
            <View style={{ marginLeft: 18 }}>
              <Paragraph
                accessible={true}
                accessibilityLabel={this.props.course_name}
                style={{
                  fontSize: 14,
                  color: "#1E4274",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "85%",
                }}
              >
                {this.props.course_name}{" "}
              </Paragraph>
              <View style={{ flexDirection: "row" }}>
                {this.props.cred_url !== null ? (
                  <Button
                    accessible={true}
                    accessibilityLabel="navigate to credential PDF"
                    type="text"
                    style={{
                      fontSize: 14,
                      marginLeft: -16,
                      justifyContent: "center",
                    }}
                    color="#CD8930"
                    onPress={() => {
                      Linking.openURL(this.props.cred_url);
                    }}
                  >
                    See credential
                  </Button>
                ) : (
                  <Text></Text>
                )}

                {this.props.cred !== null ? (
                  <IconButton
                    accessible={true}
                    accessibilityLabel="navigate to credential URL"
                    style={{
                      marginTop: "1%",
                      justifyContent: "center",
                      marginLeft: this.props.cred_url !== null ? "20%" : 0,
                    }}
                    icon="file-document-outline"
                    size={26}
                    color="#CD8930"
                    onPress={() => {
                      Linking.openURL(this.props.cred);
                    }}
                  />
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </Card.Content>
        </ScrollView>
      </View>
    );
  }
}

export function SkillsCard(props) {
  const navigation = useNavigation();
  return <SkillsCardSample navigation={navigation} {...props} />;
}
export class SkillsCardSample extends Component {
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
      <View
        style={{
          marginLeft: "1%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          accessible={true}
          accessibilityLabel={this.props.skill_name}
          style={{
            width: "33%",
            marginRight: "3%",
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
              flexWrap: "wrap",
            }}
          >
            {this.props.skill_name}
          </Paragraph>
        </View>
        <View accessible={false} accessibilityRole="none">
          <StarRating
            accessible={false}
            accessibilityRole="none"
            fullStarColor={"#CD8930"}
            starSize={20}
            disabled={false}
            maxStars={5}
            rating={this.props.years_of_exp}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            accessible={true}
            accessibilityLabel="edit details of "
            accessibilityHint={this.props.skill_name}
          >
            <MaterialIcons
              name="mode-edit"
              size={24}
              color="#CD8930"
              onPress={() => {
                this.props.navigation.push("Skillinfo", {
                  id: this.props.id,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
export function Interests(props) {
  const navigation = useNavigation();
  return <InterestsSample navigation={navigation} {...props} />;
}
export class InterestsSample extends Component {
  render() {
    return (
      <View
        accessible={true}
        accessibilityLabel={this.props.interest}
        accessibilityRole="text"
        style={{
          flexWrap: "wrap",
          marginBottom: 5,
          marginRight: 3,
        }}
      >
        <Chip
          style={{ height: 33 }}
          textStyle={{
            fontSize: 14,
            color: "#1E4274",
          }}
        >
          {this.props.interest}
        </Chip>
      </View>
    );
  }
}
export function Language(props) {
  const navigation = useNavigation();
  return <LanguageSample navigation={navigation} {...props} />;
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
              accessible={true}
              accessibilityLabel={this.props.language}
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
            <View accessible={false} accessibilityRole="none">
              <StarRating
                accessible={false}
                accessibilityRole="none"
                fullStarColor={"#CD8930"}
                starSize={20}
                disabled={false}
                maxStars={5}
                rating={this.props.level}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                alignItems: "flex-end",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              accessibilityLabel="edit details of "
              accessibilityHint={this.props.language}
            >
              <MaterialIcons
                name="mode-edit"
                size={24}
                color="#CD8930"
                onPress={() => {
                  this.props.navigation.push("Language", {
                    id: this.props.id,
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
