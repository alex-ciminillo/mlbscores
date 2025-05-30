import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { Fragment } from "react";

export function SingleGameScore({ game, red, label, imageWidth, cubs }) {
  
  // used to test scores
  const testScores = false;
  const homeTeam = game?.gameData?.teams?.home || {};
  const awayTeam = game?.gameData?.teams?.away || {};
  let innings = game?.liveData?.linescore?.innings || [];
  let isGameOver = game?.gameData?.status?.abstractGameState === "Final";
  const isGameBlank = !game || Object.keys(game).length === 0;
  let isTop = game?.liveData?.linescore?.inningHalf === "top"
  let isBottom = !isTop
  const currentInning = game?.liveData?.linescore?.currentInning
  let homeTotal = game
    ? innings.reduce((total, inning) => total + (inning.home?.runs || 0), 0)
    : " ";
  if (homeTotal === 55) {
    homeTotal = 10;
  }
  let awayTotal = game
    ? innings.reduce((total, inning) => total + (inning.away?.runs || 0), 0)
    : " ";

    // homeTotal and awayTotal should be " " if the game has not started yet
    /* datetime looks like this: {
    "dateTime": "2025-05-24T20:10:00Z",
    "originalDate": "2025-05-24",
    "officialDate": "2025-05-24",
    "dayNight": "day",
    "time": "4:10",
    "ampm": "PM"
} */ 
let beforeGame = false;
  if (homeTeam.teamName === "Red Sox") {
    
  }
    if (game?.gameData?.datetime?.dateTime) {
      const gameDate = new Date(game?.gameData?.datetime?.dateTime);
      const currentDate = new Date();
      if (gameDate > currentDate) {
        homeTotal = " ";
        awayTotal = " ";
        innings = [];
        beforeGame = true;
      }
    }

  const homeSPID = game?.gameData?.probablePitchers?.home?.id;
  const awaySPID = game?.gameData?.probablePitchers?.away?.id;

  const homeSP =
    homeSPID !== undefined
      ? game?.gameData?.players[`ID${homeSPID}`]?.primaryNumber ||
        (game ? "-" : " ")
      : "";
  const awaySP =
    awaySPID !== undefined
      ? game?.gameData?.players[`ID${awaySPID}`]?.primaryNumber ||
        (game ? "-" : " ")
      : "";

  const homeCurrentPitcherID = game?.liveData?.linescore?.defense?.pitcher?.id;
  const awayCurrentPitcherID = game?.liveData?.linescore?.offense?.pitcher?.id;

  const homeRP = isGameBlank
    ? " "
    : homeCurrentPitcherID && homeCurrentPitcherID !== homeSPID
    ? game?.gameData?.players[`ID${homeCurrentPitcherID}`]?.primaryNumber || "-"
    : "-";
  const awayRP = isGameBlank
    ? " "
    : awayCurrentPitcherID && awayCurrentPitcherID !== awaySPID
    ? game?.gameData?.players[`ID${awayCurrentPitcherID}`]?.primaryNumber || "-"
    : "-";

  const styles = StyleSheet.create({
    text: {
      color: Colors.light.text,
      fontSize: imageWidth / 80,
      fontFamily: Colors.light.fontFamily,
      marginTop: imageWidth / 190,
      lineHeight: imageWidth / 70,
    },
  });

  // check if game is today
// dateTime looks like this:
/* {
    "dateTime": "2025-05-23T17:35:00Z",
    "originalDate": "2025-05-23",
    "officialDate": "2025-05-23",
    "dayNight": "day",
    "time": "1:35",
    "ampm": "PM"
} */

const date = new Date(game?.gameData?.datetime?.dateTime);

  const isToday = date.toDateString() === new Date().toDateString();
  let newAwayTeamName;
  let newHomeTeamName;

  if (cubs && !isToday) {
   // check if hometeam is cubs
   if (homeTeam.teamName === "Cubs") {
    let teamName = awayTeam.teamName;
    // change away team name to "[teamName MM/DD]"
    newAwayTeamName = `${teamName} ${date.getMonth() + 1}/${date.getDate()}`;
    // change home team name to "homeTeam.teamName [HH:MM AM/PM]"
   newHomeTeamName = `${homeTeam.teamName} ${date.getHours() % 12}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  }
   if (awayTeam.teamName === "Cubs") {
    let teamName = homeTeam.teamName;
    // change home team name to "[teamName MM/DD]"
    newHomeTeamName = `${teamName} ${date.getMonth() + 1}/${date.getDate()}`;
   // change away team name to "homeTeam.teamName [HH:MM AM/PM]"
   // the time should be 12 hour format
   newAwayTeamName = `${awayTeam.teamName} ${date.getHours() % 12}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  }
   
  }

  return (
    <View
      style={[
        styles.borderTopSection,
        {
          flexDirection: "column",
          alignSelf: "flex-start",
          borderTopColor: red ? "red" : "white",
          marginTop: imageWidth / 155,
        },
      ]}
    >
      
      {game?.gameData?.teams?.home && !game?.gameData?.teams?.away ? null : (
        <View style={[{ flexDirection: "row" }]}>
          <View
            aria-label="away-SP"
            style={[
              styles.borderRight,
              styles.borderLeft,
              styles.borderTop,
              styles.borderBottom,
              {
                width: imageWidth / 60,
                alignItems: "center",
              },
              styles.backgroundTint,
            ]}
          >
            <Text style={styles.text}>{isGameOver ? " " : awaySP || (game ? "-" : "")}</Text>
          </View>
          <View
            aria-label="away-RP"
            style={[
              styles.borderRight,
              styles.borderTop,
              styles.borderBottom,
              {
                width: imageWidth / 60,
                alignItems: "center",
                marginLeft: imageWidth / 70,
              },
              styles.backgroundTint,
            ]}
          >
            <Text style={styles.text}>{isGameOver ? " " : awayRP}</Text>
          </View>
          <View
            aria-label="away-name"
            style={[
              styles.borderRight,
              styles.borderTop,
              styles.borderBottom,
              {
                width: imageWidth / 11,
                alignItems: "flex-start",
                marginLeft: imageWidth / 70,
              },
              styles.backgroundTint,
            ]}
          >
            <Text style={styles.text}>
              {newAwayTeamName || awayTeam.teamName || (game ? "" : "")}
            </Text>
          </View>
          {Array.from({ length: 10 }).map((_, index) => (
            <React.Fragment key={`away-inning-fragment-${index}`}>
              <View
                key={`away-inning-${index}`}
                aria-label={`away-inning-${index + 1}-score`}
                style={[
                  styles.borderRight,
                  styles.borderTop,
                  styles.borderBottom,
                  {
                    width: imageWidth / 70,
                    alignItems: "center",
                    marginLeft: imageWidth / 155,
                  },
                  styles.backgroundTint,
                  index !== 0 && index % 3 === 0 && styles.borderLeft,
                ]}
              >
                <Text style={[styles.text, { 
                  paddingLeft: index === 0 ? imageWidth / 280 : index === 3 ? imageWidth / 355 : index === 6 ? imageWidth / 525 : null,
                  marginLeft: index === 2 ? -(imageWidth / 155) : index === 4 ? -(imageWidth / 575) : index === 5 ? -(imageWidth / 145) : index === 7 ? -(imageWidth / 615) : index === 8 ? -(imageWidth / 135) : null,
                  color: red && isTop && index === currentInning - 1 ? Colors.light.highlight : undefined
                }]}>
                  {testScores ? "0" : beforeGame || (isGameOver && index < 9 && !red) ? " " : label
                  ? index + 1
                  : index < 9
                  ? innings[index]?.away?.runs 
                  : isGameOver ? awayTotal : " "}
                </Text>
              </View>
              {index % 3 === 2 && (
                <View
                  key={`section2-${index}`}
                  style={[styles.borderRightSection, styles.borderTopSection]}
                ></View>
              )}
            </React.Fragment>
          ))}
        </View>
      )}
      <View style={[{ flexDirection: "row" }]}>
        <View
          aria-label="home-SP"
          style={[
            styles.borderRight,
            styles.borderLeft,
            styles.borderTop,
            {
              alignItems: "center",
              width: imageWidth / 60,
            },
            styles.backgroundTint,
          ]}
        >
          <Text style={styles.text}>
            {label ? "SP" : isGameOver ? " " : homeSP || (game ? "-" : " ")}
          </Text>
        </View>
        <View
          aria-label="home-RP"
          style={[
            styles.borderRight,
            styles.borderTop,
            {
              width: imageWidth / 60,
              alignItems: "center",
              marginLeft: imageWidth / 70,
            },
            styles.backgroundTint,
          ]}
        >
          <Text style={styles.text}>{label ? "RP" : isGameOver ? " " : homeRP}</Text>
        </View>
        <View
          aria-label="home-name"
          style={[
            styles.borderRight,
            styles.borderTop,
            {
              width: imageWidth / 11,
              alignItems: "flex-start",
              marginLeft: imageWidth / 70,
            },
            styles.backgroundTint,
          ]}
        > 
          {newHomeTeamName ? <View>
            {/* newHomeTeamName should not wrap */}
            <Text numberOfLines={1} style={styles.text}>{newHomeTeamName}</Text>
          </View> : <Text style={styles.text}>
            {homeTeam.teamName || (game ? "" : " ")}
          </Text>}
          
        </View>
        {Array.from({ length: 10 }).map((_, index) => (
          <React.Fragment key={`home-inning-fragment-${index}`}>
            <View
              key={`home-inning-${index}`}
              aria-label={`home-inning-${index + 1}-score`}
              style={[
                styles.borderRight,
                styles.borderTop,
                {
                  width: imageWidth / 70,
                  alignItems: "center",
                  marginLeft: imageWidth / 155,
                },
                styles.backgroundTint,
                index !== 0 && index % 3 === 0 && styles.borderLeft,
              ]}
            >
              <Text style={[styles.text, { color: red && isBottom && index === currentInning - 1 && !isGameOver ? Colors.light.highlight : undefined, paddingLeft: index === 0 ? imageWidth / 280 : index === 3 ? imageWidth / 355 : index === 6 ? imageWidth / 525 : null, marginLeft: index === 2 ? -(imageWidth / 155) : index === 4 ? -(imageWidth / 575) : index === 5 ? -(imageWidth / 145) : index === 7 ? -(imageWidth / 615) : index === 8 ? -(imageWidth / 135) : null }]}>
                {testScores ? "0" : beforeGame || (isGameOver && index < 9 && !red) ? " " : label
                  ? index + 1
                  : index < 9
                  ? innings[index]?.home?.runs 
                  : isGameOver ? homeTotal : " "}
              </Text>
            </View>
            {index % 3 === 2 && (
              <View
                key={`section-${index}`}
                style={[styles.borderRightSection, styles.borderTopSection]}
              ></View>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
