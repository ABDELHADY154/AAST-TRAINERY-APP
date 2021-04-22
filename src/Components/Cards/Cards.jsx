import React, { Component } from "react";
import { View, Text, Image, Pressable } from "react-native";
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
  render() {
    console.log(this.props.item.saved);
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
            this.props.navigation.navigate("OpportunityPost", {
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
                {this.props.item.departments ? (
                  this.props.item.departments.map(item => {
                    return (
                      <Text style={{ color: "#CD8930" }}>{item.dep_name}</Text>
                    );
                  })
                ) : (
                  <Text></Text>
                )}
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
                  onPress={() => {
                    this.props.navigation.navigate("OpportunityPost", {
                      id: this.props.item.id,
                    });
                  }}
                />
              ) : (
                <IconButton
                  {...props}
                  icon="bookmark-outline"
                  size={30}
                  color="#1E4274"
                  onPress={() => {
                    this.props.navigation.navigate("OpportunityPost", {
                      id: this.props.item.id,
                    });
                  }}
                />
              )
            }
          />
          <Card.Content>
            {/* <Title>Card title</Title> */}
            <Paragraph
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
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
            this.props.navigation.navigate("OpportunityPost", {
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
                {this.props.item.departments ? (
                  this.props.item.departments.map(item => {
                    return (
                      <Text style={{ color: "#CD8930" }}>{item.dep_name}</Text>
                    );
                  })
                ) : (
                  <Text></Text>
                )}
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
                  onPress={() => {
                    this.props.navigation.navigate("OpportunityPost", {
                      id: this.props.item.id,
                    });
                  }}
                />
              ) : (
                <IconButton
                  {...props}
                  icon="bookmark-outline"
                  size={30}
                  color="#1E4274"
                  onPress={() => {
                    this.props.navigation.navigate("OpportunityPost", {
                      id: this.props.item.id,
                    });
                  }}
                />
              )
            }
          />
          <Card.Content>
            {/* <Title>Card title</Title> */}
            <Paragraph
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
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
          <Card.Actions style={{ marginTop: -3 }}>
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
            this.props.navigation.navigate("OpportunityPost", {
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
                {this.props.item.departments ? (
                  this.props.item.departments.map(item => {
                    return (
                      <Text style={{ color: "#CD8930" }}>{item.dep_name}</Text>
                    );
                  })
                ) : (
                  <Text></Text>
                )}
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
                  onPress={() => {
                    this.props.navigation.navigate("OpportunityPost", {
                      id: this.props.item.id,
                    });
                  }}
                />
              ) : (
                <IconButton
                  {...props}
                  icon="bookmark-outline"
                  size={30}
                  color="#1E4274"
                  onPress={() => {
                    this.props.navigation.navigate("OpportunityPost", {
                      id: this.props.item.id,
                    });
                  }}
                />
              )
            }
          />
          <Card.Content>
            {/* <Title>Card title</Title> */}
            <Paragraph
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
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
                  marginTop: -7,
                  // alignItems: "flex-end",
                  // justifyContent: "flex-end",
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
            // subtitle={
            //   <View style={{ flexDirection: "row" }}>
            //     {this.props.item.departments ? (
            //       this.props.item.departments.map(item => {
            //         return (
            //           <Text style={{ color: "#CD8930" }}>{item.dep_name}</Text>
            //         );
            //       })
            //     ) : (
            //       <Text></Text>
            //     )}
            //   </View>
            // }
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
            {/* <Title>Card title</Title> */}
            <Paragraph
              style={{
                // marginHorizontal: 23,
                fontSize: 14,
                color: "#1E4274",
                lineHeight: 19,
              }}
            >
              {this.props.item.description}
            </Paragraph>
            <Card.Cover source={{ uri: this.props.item.sponsor_image }} />
          </Card.Content>
          <View
            style={{
              backgroundColor: "#CCCCCC",
              width: "90%",
              height: 1,
              marginVertical: 5,
              // marginHorizontal: 10,
              // alignItems: "center",
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

// export class PromotedCard extends Component {
//   render() {
//     return (
//       <View>
//         <Card
//           style={{
//             width: "95%",
//             marginLeft: 9,
//             marginBottom: 10,
//             borderWidth: 1,
//             borderColor: "#CCCCCC",
//           }}
//         >
//           <Card.Title
//             style={{ marginLeft: 1 }}
//             title="UI/UX Designer"
//             titleStyle={{
//               color: "#1E4274",
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//             subtitle={
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={{ color: "#1E4274" }}>Qowwa{"   "}</Text>
//                 <Text style={{ color: "#CD8930" }}>BIS</Text>
//               </View>
//             }
//             subtitleStyle={{
//               color: "#1E4274",
//               fontSize: 14,
//               marginTop: -3,
//             }}
//             left={props => (
//               <Card.Cover
//                 style={{ height: 45, width: 45, borderRadius: 5 }}
//                 source={{
//                   uri:
//                     "https://media-exp1.licdn.com/dms/image/C4D0BAQGIjrvGeYN4Uw/company-logo_200_200/0/1519920801777?e=2159024400&v=beta&t=io9cI7BXwBR1wGhYyoWNAfXVBez6PSqU0li8GoGUbmI",
//                 }}
//               />
//             )}
//             right={props => (
//               <IconButton
//                 {...props}
//                 icon="bookmark-outline"
//                 size={30}
//                 color="#1E4274"
//                 onPress={() => {}}
//               />
//             )}
//           />
//           <Card.Content>
//             {/* <Title>Card title</Title> */}
//             <Paragraph
//               style={{
//                 // marginHorizontal: 23,
//                 fontSize: 14,
//                 color: "#1E4274",
//                 lineHeight: 19,
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
//               ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
//               dictumst nisi blandit ornare viverra eleifend
//             </Paragraph>
//             {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
//           </Card.Content>
//           <View
//             style={{
//               backgroundColor: "#CCCCCC",
//               width: "90%",
//               height: 1,
//               marginVertical: 5,
//               // marginHorizontal: 10,
//               // alignItems: "center",
//               alignSelf: "center",
//             }}
//           ></View>
//           <Card.Actions style={{ marginTop: -3, marginLeft: 5 }}>
//             <Feather name="arrow-up-right" size={35} color="#1E4274" />

//             <View style={{ marginTop: -7 }}>
//               <Button style={{ marginLeft: -26 }}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     textTransform: "capitalize",
//                     fontWeight: "bold",
//                     color: "#1E4274",
//                   }}
//                 >
//                   Promoted
//                 </Text>
//               </Button>

//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: "#1E4274",
//                   marginLeft: 16,
//                   marginTop: -7,
//                   // alignItems: "flex-end",
//                   // justifyContent: "flex-end",
//                 }}
//               >
//                 Deadline 11 oct 2020
//               </Text>
//             </View>
//           </Card.Actions>
//         </Card>
//       </View>
//     );
//   }
// }

// export class AdsCard extends Component {
//   render() {
//     return (
//       <View>
//         <Card
//           style={{
//             width: "95%",
//             marginLeft: 9,
//             marginBottom: 10,
//             borderWidth: 1,
//             borderColor: "#CCCCCC",
//           }}
//         >
//           <Card.Title
//             style={{ marginLeft: 1 }}
//             title="Qowwa"
//             titleStyle={{
//               color: "#1E4274",
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//             subtitle="BIS"
//             subtitleStyle={{
//               color: "#CD8930",
//               fontSize: 14,
//               marginTop: -3,
//             }}
//             left={props => (
//               <Card.Cover
//                 style={{ height: 45, width: 45, borderRadius: 5 }}
//                 source={{
//                   uri:
//                     "https://media-exp1.licdn.com/dms/image/C4D0BAQGIjrvGeYN4Uw/company-logo_200_200/0/1519920801777?e=2159024400&v=beta&t=io9cI7BXwBR1wGhYyoWNAfXVBez6PSqU0li8GoGUbmI",
//                 }}
//               />
//             )}
//           />
//           <Card.Content>
//             {/* <Title>Card title</Title> */}
//             <Paragraph
//               style={{
//                 // marginHorizontal: 23,
//                 fontSize: 14,
//                 color: "#1E4274",
//                 lineHeight: 19,
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
//               ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
//               dictumst nisi blandit ornare viverra eleifend
//             </Paragraph>
//             {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
//           </Card.Content>
//           <View
//             style={{
//               backgroundColor: "#CCCCCC",
//               width: "90%",
//               height: 1,
//               marginVertical: 5,
//               // marginHorizontal: 10,
//               // alignItems: "center",
//               alignSelf: "center",
//             }}
//           ></View>
//           <Card.Actions style={{ marginTop: -3, marginLeft: 10 }}>
//             <FontAwesome5 name="ad" size={24} color="#1E4274" />
//           </Card.Actions>
//         </Card>
//       </View>
//     );
//   }
// }

// export class AdsCardImg extends Component {
//   render() {
//     return (
//       <View>
//         <Card
//           style={{
//             width: "95%",
//             marginLeft: 9,
//             marginBottom: 10,
//             borderWidth: 1,
//             borderColor: "#CCCCCC",
//           }}
//         >
//           <Card.Title
//             style={{ marginLeft: 1 }}
//             title="Qowwa"
//             titleStyle={{
//               color: "#1E4274",
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//             subtitle="BIS"
//             subtitleStyle={{
//               color: "#CD8930",
//               fontSize: 14,
//               marginTop: -3,
//             }}
//             left={props => (
//               <Card.Cover
//                 style={{ height: 45, width: 45, borderRadius: 5 }}
//                 source={{
//                   uri:
//                     "https://media-exp1.licdn.com/dms/image/C4D0BAQGIjrvGeYN4Uw/company-logo_200_200/0/1519920801777?e=2159024400&v=beta&t=io9cI7BXwBR1wGhYyoWNAfXVBez6PSqU0li8GoGUbmI",
//                 }}
//               />
//             )}
//           />
//           <Card.Content>
//             {/* <Title>Card title</Title> */}
//             <Paragraph
//               style={{
//                 // marginHorizontal: 23,
//                 fontSize: 14,
//                 color: "#1E4274",
//                 lineHeight: 19,
//                 marginBottom: 10,
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
//               ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
//               dictumst nisi blandit ornare viverra eleifend
//             </Paragraph>
//             <Card.Cover
//               // ViewStyle={{
//               //   height: "30%",
//               //   width: "100%",
//               //   marginVertical: 15,
//               // }}
//               source={{
//                 uri:
//                   "https://www.cibeg.com/English/Personal/waystobank/PublishingImages/CIB%20-%20Digital%20Transformation%20[English%20Banner].jpg",
//               }}
//             />
//             {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
//           </Card.Content>
//           <View
//             style={{
//               backgroundColor: "#CCCCCC",
//               width: "90%",
//               height: 1,
//               // marginVertical: 5,
//               marginTop: 10,
//               alignSelf: "center",
//             }}
//           ></View>
//           <Card.Actions style={{ marginTop: -3, marginLeft: 10 }}>
//             <FontAwesome5 name="ad" size={24} color="#1E4274" />
//           </Card.Actions>
//         </Card>
//       </View>
//     );
//   }
// }

// export class AdsCardImgOnly extends Component {
//   render() {
//     return (
//       <View>
//         <Card
//           style={{
//             width: "95%",
//             marginLeft: 9,
//             marginBottom: 10,
//             borderWidth: 1,
//             borderColor: "#CCCCCC",
//           }}
//         >
//           <Card.Title
//             style={{ marginLeft: 1 }}
//             title="Qowwa"
//             titleStyle={{
//               color: "#1E4274",
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//             subtitle="BIS"
//             subtitleStyle={{
//               color: "#CD8930",
//               fontSize: 14,
//               marginTop: -3,
//             }}
//             left={props => (
//               <Card.Cover
//                 style={{ height: 45, width: 45, borderRadius: 5 }}
//                 source={{
//                   uri:
//                     "https://media-exp1.licdn.com/dms/image/C4D0BAQGIjrvGeYN4Uw/company-logo_200_200/0/1519920801777?e=2159024400&v=beta&t=io9cI7BXwBR1wGhYyoWNAfXVBez6PSqU0li8GoGUbmI",
//                 }}
//               />
//             )}
//           />
//           <Card.Content>
//             <Card.Cover
//               // ViewStyle={{
//               //   height: "30%",
//               //   width: "100%",
//               //   marginVertical: 15,
//               // }}
//               source={{
//                 uri:
//                   "https://www.cibeg.com/English/Personal/waystobank/PublishingImages/CIB%20-%20Digital%20Transformation%20[English%20Banner].jpg",
//               }}
//             />
//             {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
//           </Card.Content>
//           <View
//             style={{
//               backgroundColor: "#CCCCCC",
//               width: "90%",
//               height: 1,
//               // marginVertical: 5,
//               marginTop: 10,
//               alignSelf: "center",
//             }}
//           ></View>
//           <Card.Actions style={{ marginTop: -3, marginLeft: 10 }}>
//             <FontAwesome5 name="ad" size={24} color="#1E4274" />
//           </Card.Actions>
//         </Card>
//       </View>
//     );
//   }
// }

// export class AdvisorCard extends Component {
//   render() {
//     return (
//       <View>
//         <Card
//           style={{
//             width: "95%",
//             marginLeft: 9,
//             marginBottom: 10,
//             borderWidth: 1,
//             borderColor: "#CCCCCC",
//           }}
//           onPress={() => {
//             this.props.navigation.push("OpportunityPost", {
//               id: 3,
//             });
//           }}
//         >
//           <Card.Title
//             style={{ marginLeft: 1 }}
//             title="UI/UX Designer"
//             titleStyle={{
//               color: "#1E4274",
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//             subtitle={
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={{ color: "#1E4274" }}>Qowwa{"   "}</Text>
//                 <Text style={{ color: "#CD8930" }}>BIS</Text>
//               </View>
//             }
//             subtitleStyle={{
//               // color: "#1E4274",
//               fontSize: 14,
//               marginTop: -3,
//             }}
//             left={props => (
//               <Pressable
//                 onPress={() => {
//                   this.props.navigation.push("CompanyProfile", {
//                     id: 13,
//                   });
//                 }}
//               >
//                 <Card.Cover
//                   style={{
//                     height: 45,
//                     width: 45,
//                     borderRadius: 5,
//                   }}
//                   // onPress={() => {
//                   //   this.props.navigation.navigate("CompanyProfile");
//                   // }}
//                   source={{
//                     uri:
//                       "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//                   }}
//                 />
//               </Pressable>
//             )}
//             right={props => (
//               <IconButton
//                 {...props}
//                 icon="bookmark-outline"
//                 size={30}
//                 color="#1E4274"
//                 onPress={() => {}}
//               />
//             )}
//           />
//           <Card.Content>
//             {/* <Title>Card title</Title> */}
//             <Paragraph
//               style={{
//                 // marginHorizontal: 23,
//                 fontSize: 14,
//                 color: "#1E4274",
//                 lineHeight: 19,
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Consectetur dictumst nisi blandit ornare viverra eleifend Lorem
//               ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
//               dictumst nisi blandit ornare viverra eleifend
//             </Paragraph>
//             {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
//           </Card.Content>
//           <View
//             style={{
//               backgroundColor: "#CCCCCC",
//               width: "90%",
//               height: 1,
//               marginVertical: 7,
//               // marginHorizontal: 10,
//               // alignItems: "center",
//               alignSelf: "center",
//             }}
//           ></View>
//           <Card.Actions style={{ marginTop: -3 }}>
//             <Pressable
//               style={{ flexDirection: "row" }}
//               onPress={() => {
//                 this.props.navigation.push("AdvisorProfile", {
//                   id: 10,
//                 });
//               }}
//             >
//               <Card.Cover
//                 style={{
//                   height: 35,
//                   width: 35,
//                   borderRadius: 7,
//                   marginLeft: 10,
//                 }}
//                 source={{
//                   uri:
//                     "https://images.unsplash.com/photo-1568941235198-ddb29eb888ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dG9kbyUyMGxpc3R8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//                 }}
//               />
//               <View style={{ marginTop: -7 }}>
//                 <Button>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       textTransform: "capitalize",
//                       fontWeight: "bold",
//                       color: "#1E4274",
//                       // marginTop: -6,
//                     }}
//                   >
//                     Dr. Rehab Elbadrawy
//                   </Text>
//                 </Button>

//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#1E4274",
//                     marginLeft: 16,
//                     marginTop: -7,
//                     // alignItems: "flex-end",
//                     // justifyContent: "flex-end",
//                   }}
//                 >
//                   Deadline 11 oct 2020
//                 </Text>
//               </View>
//             </Pressable>
//           </Card.Actions>
//         </Card>
//       </View>
//     );
//   }
// }
