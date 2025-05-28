import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { SingleGameScore } from "./SingleGameScore";
import { gameDataLabels } from "../constants/constants";
import { MiddleSectionTop } from "@/components/MiddleSectionTop";
import { MiddleSectionBottom } from "@/components/MiddleSectionBottom";

export function MiddleSection({ gamesToday, cubGameData, imageWidth }) {
  return (
    <View style={styles.container}>
      <MiddleSectionTop gamesToday={gamesToday} cubGameData={cubGameData} imageWidth={imageWidth} />
      <MiddleSectionBottom cubGameData={cubGameData} imageWidth={imageWidth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    fontFamily: "Anton",
  },
});
