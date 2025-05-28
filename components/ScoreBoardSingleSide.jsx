import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "./../constants/Colors";
import { SingleGameScore } from "./SingleGameScore";
import { gameDataLabels } from "./../constants/constants";

export function ScoreBoardSingleSide({ game, title, cubs, imageWidth, rightSide }) {
  return (
    <View style={[styles.container, {marginLeft: rightSide ? -(imageWidth / 175) : null}]}>
      <Text
        style={{
          color: Colors.light.text,
          fontSize: 40,
          alignSelf: title.pos,
        }}
      ></Text>
      {Array.from({ length: 6 }).map((_, index) => (
        <SingleGameScore
          imageWidth={imageWidth}
          key={index}
          game={index === 5 && cubs ? cubs : game[index] || null}
          red={index === 5 && cubs ? true : false}
          cubs={cubs}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
  },
});
