import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Image } from "react-native";
import { BubbleNumber } from "../components/BubbleNumber";

export function MiddleSectionBottom({ cubGameData, imageWidth }) {
  let isGameOver = cubGameData?.gameData?.status?.abstractGameState === "Final";

  const batterId =
    cubGameData?.liveData?.plays?.currentPlay?.matchup?.batter?.id;
  const currentBatter =
    cubGameData?.gameData?.players?.[`ID${batterId}`]?.primaryNumber;
    
  let ballCount = cubGameData?.liveData?.plays?.currentPlay?.count?.balls;

  let strikeCount = cubGameData?.liveData?.plays?.currentPlay?.count?.strikes;

  let outs = cubGameData?.liveData?.linescore?.outs;

  const isCubsHome = cubGameData?.gameData?.teams?.home?.abbreviation === "CHC";
  const otherTeamAbbreviation = isCubsHome
    ? cubGameData?.gameData?.teams?.away?.abbreviation
    : cubGameData?.gameData?.teams?.home?.abbreviation;
  
  let cubsHits = ""
  let otherTeamHits = ""
  
let beforeGame = false;
  if (cubGameData?.gameData?.datetime?.dateTime) {
    const gameDate = new Date(cubGameData?.gameData?.datetime?.dateTime);
    const currentDate = new Date();
    if (gameDate > currentDate) {
      beforeGame = true;
    }
  }

  if (!beforeGame) {
  cubsHits = isCubsHome
    ? cubGameData?.liveData?.linescore?.teams?.home?.hits
    : cubGameData?.liveData?.linescore?.teams?.away?.hits;
  otherTeamHits = isCubsHome
    ? cubGameData?.liveData?.linescore?.teams?.away?.hits
    : cubGameData?.liveData?.linescore?.teams?.home?.hits;
  }

  const gameStatus = cubGameData?.gameData?.status?.abstractGameState;
  const isGameInProgress = gameStatus === "Live";

  function splitToDigits(num) {
    if (!num) return [null, null];
    const str = num?.toString().padStart(2, "0"); // ensures at least 2 digits

    return [parseInt(str[0], 10), parseInt(str[1], 10)];
  }

  let [batterDigitOne, batterDigitTwo] = splitToDigits(currentBatter);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      width: "100%",
    },
    text: {
      color: Colors.light.text,
      fontSize: imageWidth / 80,
      fontFamily: "Anton",
      lineHeight: imageWidth / 70,
    },
    box: {
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    boxContainer: {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    item: {
      alignItems: "flex-start",
    },
    rowBottom: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
  });

  const testScores = false;
  if (isGameOver) {
    batterDigitOne = null;
    batterDigitTwo = null;
    ballCount = null;
    strikeCount = null;
    outs = null;
  }
 
  return (
    <View style={[styles.container, { marginBottom: -(imageWidth / 900) }]}>
      <View
        style={[
          styles.box,
          {
            width: imageWidth / 18,
            height: imageWidth / 24,
            marginBottom: imageWidth / 50,
            marginRight: imageWidth / 21.8,
            display: "flex",
            flexDirection: "row",
          },
        ]}
      >
        <Text selectable={false}
          style={[
            styles.text,
            {
              fontSize: imageWidth / 35,
              marginBottom: imageWidth / 75,
              marginLeft: imageWidth / 155,
            },
          ]}
        >
          <BubbleNumber
            imageWidth={imageWidth}
            number={isGameOver ? "" : testScores ? "0" : batterDigitOne === 0 ? "0" : batterDigitOne ? batterDigitOne : 0}
            hide={batterDigitOne === 0 || beforeGame}
          />
        </Text>
        <Text selectable={false}
          style={[
            styles.text,
            {
              fontSize: imageWidth / 35,
              marginBottom: imageWidth / 75,
              marginLeft: -(imageWidth / 500),
            },
          ]}
        >
          <BubbleNumber
            imageWidth={imageWidth}
            number={testScores ? "0" : batterDigitTwo === 0 ? "0" : batterDigitTwo || (isGameOver ? "" : "")}
            hide={beforeGame}
          />
        </Text>
      </View>

      <View style={[styles.row, { marginBottom: imageWidth / 80 }]}>
        <View
          style={[
            styles.box,
            {
              marginRight: imageWidth / 10.5,
              width: imageWidth / 40,
              height: imageWidth / 24,
              marginBottom: imageWidth / 160,
            },
          ]}
        >
          <Text selectable={false}
            style={[
              styles.text,
              {
                fontSize: imageWidth / 35,
                marginBottom: imageWidth / 90,
                marginLeft: imageWidth / 85,
              },
            ]}
          >
            <BubbleNumber
              imageWidth={imageWidth}
              number={
                testScores ? "0" : ballCount !== undefined
                  ? ballCount
                  : isGameInProgress
                  ? "0"
                  : ""
              }
              hide={beforeGame}
            />
          </Text>
        </View>
        <View
          style={[
            styles.box,
            {
              width: imageWidth / 40,
              height: imageWidth / 24,
              marginRight: -(imageWidth /990),
            },
          ]}
        >
          <Text selectable={false}
            style={[
              styles.text,
              {
                fontSize: imageWidth / 35,
                marginBottom: imageWidth / 90,
                marginLeft: imageWidth / 28000,
              },
            ]}
          >
            <BubbleNumber
              imageWidth={imageWidth}
              number={
                testScores ? "5" : strikeCount !== undefined
                  ? strikeCount
                  : isGameInProgress
                  ? "0"
                  : ""
              }
              hide={beforeGame}
            />
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.box,
          {
            marginRight: imageWidth / 16.68,
            width: imageWidth / 40,
            height: imageWidth / 24,
            marginBottom: imageWidth / 65.5,
          },
        ]}
      >
        <Text selectable={false}
          style={[
            styles.text,
            {
              fontSize: imageWidth / 35,
              marginBottom: imageWidth / 72,
              marginLeft: imageWidth / 220,
            },
          ]}
        >
          <BubbleNumber
            imageWidth={imageWidth}
            number={testScores ? "5" : outs !== undefined ? outs : isGameInProgress ? "0" : ""}
            hide={beforeGame}
          />
        </Text>
      </View>
      {!isCubsHome ? <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            marginBottom: -(imageWidth / 50),
          },
        ]}
      >
        {/* <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/cubs.png")}
            style={styles.image}
          />
        </View> */}
        
        <View style={{ marginBottom: -(imageWidth / 1500), flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%", }}>
          <View style={[styles.box, { width: imageWidth / 31,
            height: imageWidth / 65, marginLeft: imageWidth / 50 }]}>
            <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>CUBS</Text>
          </View>
          <View style={(styles.box, { marginLeft: imageWidth / 270,width: imageWidth / 65,
            height: imageWidth / 65,  display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" })}>
            <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>
            {testScores ? "55" : cubsHits !== undefined ? cubsHits : isGameInProgress ? "0" : "   "}
          </Text>
        </View>
        <View style={[styles.box, { marginLeft: imageWidth / 25.5,width: imageWidth / 65,
            height: imageWidth / 65, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
          <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>
            {testScores ? "55" : otherTeamHits !== undefined
              ? otherTeamHits
              : isGameInProgress
              ? "0"
              : "   "}
          </Text>
        </View>
        <View style={[styles.box, { marginLeft: imageWidth / 255,width: imageWidth / 31,
            height: imageWidth / 65 }]}>
          <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>{otherTeamAbbreviation || "--"}</Text>
        </View>
      </View>
      </View> : <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            marginBottom: -(imageWidth / 50),
          },
        ]}
      >
        {/* <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/cubs.png")}
            style={styles.image}
          />
        </View> */}
        
        <View style={{ marginBottom: -(imageWidth / 1500), flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%", }}>
          <View style={[styles.box, { width: imageWidth / 31,
            height: imageWidth / 65, marginLeft: imageWidth / 50 }]}>
            <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>{otherTeamAbbreviation || "--"}</Text>
          </View>
          <View style={(styles.box, { marginLeft: imageWidth / 270,width: imageWidth / 65,
            height: imageWidth / 65,  display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" })}>
            <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>
            {testScores ? "55" : otherTeamHits !== undefined
              ? otherTeamHits
              : isGameInProgress
              ? "0"
              : "   "}
            </Text>
        </View>
        <View style={[styles.box, { marginLeft: imageWidth / 25.5,width: imageWidth / 65,
            height: imageWidth / 65, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
          <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>
          {testScores ? "55" : cubsHits !== undefined ? cubsHits : isGameInProgress ? "0" : "   "}
         
          </Text>
        </View>
        <View style={[styles.box, { marginLeft: imageWidth / 255,width: imageWidth / 31,
            height: imageWidth / 65 }]}>
          <Text selectable={false} style={[styles.text, {color: Colors.light.highlight}]}>CUBS</Text>
        </View>
      </View>
      </View>
      }
    </View>
  );
}
