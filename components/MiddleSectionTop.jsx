import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Image } from "react-native";
import { BubbleNumber } from "../components/BubbleNumber";

export function MiddleSectionTop({ gamesToday, cubGameData, imageWidth }) {
  const isCubsHome = cubGameData?.gameData?.teams?.home?.abbreviation === "CHC";
  const cubsScore = isCubsHome
    ? cubGameData?.liveData?.linescore?.teams?.home?.runs || 0
    : cubGameData?.liveData?.linescore?.teams?.away?.runs || 0;
  const otherTeamScore = isCubsHome
    ? cubGameData?.liveData?.linescore?.teams?.away?.runs || 0
    : cubGameData?.liveData?.linescore?.teams?.home?.runs || 0;
  const otherTeamAbbreviation = isCubsHome
    ? cubGameData?.gameData?.teams?.away?.abbreviation
    : cubGameData?.gameData?.teams?.home?.abbreviation;

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    text: {
      color: Colors.light.text,
      fontSize: imageWidth / 80,
      fontFamily: "Anton",
    },
    box: {
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
  });

  function splitToDigits(num) {
    console.log(num);
    if (!num) return [null, null];
    const str = num?.toString().padStart(2, "0"); // ensures at least 2 digits
    console.log([parseInt(str[0], 10), parseInt(str[1], 10)]);
    return [parseInt(str[0], 10), parseInt(str[1], 10)];
  }

  const [cubDigitOne, cubDigitTwo] = splitToDigits(cubsScore);
  console.log("cubDigitOne", cubDigitOne)
  console.log("cubDigitTwo", cubDigitTwo)
  const [otherDigitOne, otherDigitTwo] = splitToDigits(otherTeamScore);
  console.log("otherDigitOne", otherDigitOne)
  console.log("otherDigitTwo", otherDigitTwo)
// check game over using abstractGameState and cubGameData
//GameData to get isGameOver
   let isGameOver = cubGameData?.gameData?.status?.abstractGameState === "Final";

isGameOver = true;

// check if game went to a 10th inning by counting the number of innings in cubGameData
let is10Innings = cubGameData?.liveData?.linescore?.innings?.length >= 10;
// used to test scores
const testScores = false;


  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <View
            style={[
              styles.box,
              {
                width: imageWidth / 19,
                height: imageWidth / 24,
                marginBottom: imageWidth / 250,
                marginLeft: imageWidth / 300,
                paddingLeft: imageWidth / 55,
                paddingTop: imageWidth / 300,
              },
            ]}
          >
            {/* <Image
              source={require("@/assets/images/cubs.png")}
              style={styles.image}
            /> */}
            <Text style={[styles.text, { fontSize: imageWidth / 35 }]}>
              CHC
            </Text>
          </View>
          <View
            style={[
              styles.box,
              {
                width: imageWidth / 19,
                height: imageWidth / 24,
                marginBottom: imageWidth / 170,
                marginLeft: imageWidth / 80,
                paddingLeft: imageWidth / 950,
                display: "flex",
                flexDirection: "row",
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  fontSize: imageWidth / 35,
                  marginBottom: imageWidth / 35,
                  marginLeft: imageWidth / 180,
                },
              ]}
            >
              <BubbleNumber
                imageWidth={imageWidth}
                number={testScores ? "0" : cubDigitOne === 0 ? "0" : cubDigitOne ? cubDigitOne : ""}
                hide={!testScores || cubDigitOne === 0}
              />
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: imageWidth / 35,
                  marginBottom: imageWidth / 35,
                  marginLeft: -(imageWidth / 500),
                },
              ]}
            >
              <BubbleNumber
                imageWidth={imageWidth}
                number={testScores ? "2" : cubDigitTwo || ""}
              />
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View
            style={[
              styles.box,
              {
                width: imageWidth / 19,
                height: imageWidth / 24,
                marginBottom: imageWidth / 350,
                marginLeft: imageWidth / 26,
                paddingLeft: imageWidth / 1505,
                paddingTop: imageWidth / 300,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: imageWidth / 35 }]}>
              {otherTeamAbbreviation}
            </Text>
          </View>
          <View
            style={[
              styles.box,
              {
                width: imageWidth / 19,
                height: imageWidth / 24,
                marginBottom: imageWidth / 190,
                marginLeft: imageWidth / 30,
                paddingLeft: imageWidth / 125,
                display: "flex",
                flexDirection: "row",
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  fontSize: imageWidth / 35,
                  marginBottom: imageWidth / 38,
                  marginLeft: imageWidth / 120,
                },
              ]}
            >
              <BubbleNumber
                imageWidth={imageWidth}
                number={testScores ? "0" : otherDigitOne === 0 ? "0" : otherDigitOne ? otherDigitOne : ""}
                hide={!testScores || otherDigitOne === 0}
              />
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: imageWidth / 35,
                  marginBottom: imageWidth / 38,
                  marginLeft: -(imageWidth / 500),
                },
              ]}
            >
              <BubbleNumber
                imageWidth={imageWidth}
                number={testScores ? "5" :otherDigitTwo || ""}
              />
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: imageWidth / 60,
          width: imageWidth / 12,
          marginBottom: imageWidth / 30,
          marginRight: imageWidth / 33.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: -(imageWidth / 500) }}>
        {/* this should use an abbreviation for the day of the week, not the whole day spelled out */}
          {cubGameData?.gameData?.status?.abstractGameState === "Preview" ? (
            <Text style={styles.text}>
              {new Date(cubGameData?.gameData?.datetime?.dateTime).toLocaleString(
                "en-US",
                {
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            )}
          </Text>
        ) : !isGameOver ? (
          <Text style={styles.text}>
            {cubGameData?.liveData?.linescore?.inningHalf === "top"
              ? "Top"
              : "Bottom"}{" "}
            {cubGameData?.liveData?.linescore?.currentInning}
          </Text>
        ) : is10Innings ? (
          <Text style={styles.text}>Final/{cubGameData?.liveData?.linescore?.innings?.length}</Text>
        ) : (
          <Text style={styles.text}>Final</Text>
        )}
        </View>
      </View>
    </View>
  );
}
