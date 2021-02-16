import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CompanyCard } from "../Cards/CompanyCard";
import { AdvisorCard } from "../Cards/AdvisorCard";
import { PromotedCard } from "../Cards/PromotedCard";
import { SessionCard } from "../Cards/SessionCard";
import { AdsCard } from "../Cards/AdsCard";
import { AdsCardImg } from "../Cards/AdsCardImg";
import { Container, Content, Button, Text, Right } from "native-base";
import { Feather } from "@expo/vector-icons";

export default class ExploreScreen extends Component {
  render() {
    return (
      <Container style={{ marginBottom: 20 }}>
        <Content style={{ marginTop: 55 }}>
          <SafeAreaView>
            <ScrollView>
              <Button transparent>
                <Right>
                  <Feather
                    name="search"
                    size={28}
                    color="#1E4274"
                    style={{
                      marginRight: 20,
                    }}
                  />
                </Right>
              </Button>

              <AdvisorCard />

              <AdsCard />
              <AdsCardImg />
              <CompanyCard />
              <PromotedCard />
              {/* <SessionCard /> */}
            </ScrollView>
          </SafeAreaView>
        </Content>
        <StatusBar style="auto" />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
