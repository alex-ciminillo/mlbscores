import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { TheCrown } from "@/components/TheCrown";
import { ScoreBoardSingleSide } from "@/components/ScoreBoardSingleSide";
import { MiddleSection } from "@/components/MiddleSection";
import {
  getMLBGamesToday,
  getUpcomingMLBGamesThisMonth,
  getLiveGameData
} from "@/services/mlbapis";
import { Colors } from "@/constants/Colors";
import { Dimensions } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const loadFonts = () => {
  return Font.loadAsync({
    Anton: require("../../assets/fonts/Anton-Regular.ttf"), // Adjust the path if necessary
  });
};

export default function HomeScreen() {
  const [gamesToday, setGamesToday] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState([]);
  const [gameDataMonthly, setGameDataMonthly] = useState([]);
  const [nationalGames, setNationalGames] = useState([]);
  const [americanGames, setAmericanGames] = useState([]);
  const [nextCubGameData, setNextCubGameData] = useState({});
  const [cubGameData, setCubGameData] = useState({});
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const getMonthGames = async () => {
    try {
      let gamesMonthly = await getUpcomingMLBGamesThisMonth();
      
      
      // function that removes only the first upcoming Cubs game from gamesMonthly
        
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0];
        
        
        // Find today's date entry in the dates array
        const todayEntry = gamesMonthly?.dates?.find(date => 
          date?.date === todayDate
        );
        
        if (!todayEntry) {
         
          return gamesMonthly;
        }
      
        // Find the first Cubs game in today's games
        const cubsGame = todayEntry?.games?.find(game => {
          const isCubsAway = game.teams.away.team.name === 'Chicago Cubs';
          const isCubsHome = game.teams.home.team.name === 'Chicago Cubs';
          if (isCubsAway || isCubsHome) {
           
            return true;
          }
          return false;
        });
        
        if (!cubsGame) {
         
          // return gamesMonthly;
        }
        
        // function that takes in gamesMonthly and a gamePk and removes that game from gamesMonthly
        const removeGame = (gamesMonthly, gamePk) => {
          if (!gamesMonthly) return gamesMonthly;
          
          const updatedDates = gamesMonthly.dates.map(date => {
            if (date.date === todayDate) {
              const games = date.games.filter(game => game.gamePk !== gamePk);
              return {
                ...date,
                games: games,
                totalItems: games.length,
                totalGames: games.length
              };
            }
            return date;
          });

          // Update top-level totals
          const totalGames = updatedDates.reduce((sum, date) => sum + date.totalGames, 0);
          
          return {
            ...gamesMonthly,
            dates: updatedDates,
            totalItems: totalGames,
            totalGames: totalGames
          };
        };

        // used to test the future cub game scenario
        // gamesMonthly = removeGame(gamesMonthly, cubsGame.gamePk);
        
        

   
      setGameDataMonthly(gamesMonthly);

      // Find next Cubs game in gamesMonthly
      const isCubsTeam = (team) => 
        team.name === 'Chicago Cubs' || team.id === 112;

      const nextCubsGame = gamesMonthly?.dates?.flatMap(date => date.games)
        .find(game => isCubsTeam(game.teams.away.team) || isCubsTeam(game.teams.home.team));
     
      if (nextCubsGame) {
        setNextCubGameData(nextCubsGame);
      }

    } catch (error) {
      console.error('Error fetching monthly games:', error);
    }
  };


  const getDayGames = async () => {
    const gamesDaily = await getMLBGamesToday();
    setGamesToday(gamesDaily?.dates || []);
  };

  const getCubGame = async () => {
    if (Object.keys(nextCubGameData).length > 0) {
      const liveData = await getLiveGameData(nextCubGameData?.gamePk?.toString());
      setCubGameData(liveData);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const refreshData = async () => {
      try {
        const monthlyData = await getUpcomingMLBGamesThisMonth();
        if (isMounted) {
          setGameDataMonthly(monthlyData);
        }
      } catch (error) {
        console.error('Error fetching monthly games:', error);
      }
    };

    const refreshInterval = setInterval(refreshData, 10000);
    refreshData(); // Initial fetch

    return () => {
      clearInterval(refreshInterval);
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const fetchDayGames = async () => {
      try {
        const dailyData = await getMLBGamesToday();
        if (isMounted) {
          setGamesToday(dailyData?.dates || []);
        }
      } catch (error) {
        console.error('Error fetching daily games:', error);
      }
    };

    fetchDayGames();
  }, [gameDataMonthly]);

  useEffect(() => {
    if (gamesToday.length === 0) {
      setGameData([]);
      return;
    }

    const fetchGameData = async () => {
      const gameDataPromises = gamesToday.flatMap((date) =>
        date.games.map((game) =>
          getLiveGameData(game?.gamePk?.toString()).catch(() => null)
        )
      );
      const gameDataResponses = (await Promise.all(gameDataPromises)).filter(
        Boolean
      );
      setGameData(gameDataResponses);
      setIsLoading(false);
    };

    fetchGameData();
  }, [gamesToday]);

  useEffect(() => {
    const cubsGame = gameData.find(
      (game) =>
        game?.teams?.away?.team?.name === "Chicago Cubs" ||
        game?.teams?.home?.team?.name === "Chicago Cubs"
    );
    if (cubsGame) {
      setCubGameData(cubsGame);
      setNextCubGameData({});
    } else {
      const upcomingCubGame = gameDataMonthly?.dates?.flatMap((date) =>
        date.games.filter(
          (game) =>
            game?.teams?.away?.team?.name === "Chicago Cubs" ||
            game?.teams?.home?.team?.name === "Chicago Cubs"
        )
      )[0];
      setNextCubGameData(upcomingCubGame || {});
    }

    const remainingGames = gameData.filter(
      (game) =>
        game?.gameData?.teams?.away?.name !== "Chicago Cubs" &&
        game?.gameData?.teams?.home?.name !== "Chicago Cubs"
    );
 
    const nationalGames = remainingGames.filter((game) =>
      game?.gameData?.teams?.home?.league?.name === "National League"
  )

    setNationalGames(nationalGames);
    setAmericanGames(
      remainingGames.filter(
        (game) =>
          game?.gameData?.teams?.home?.league?.name === "American League"
      )
    );
  }, [gameData]);

  useEffect(() => {
    if (
      Object.keys(cubGameData).length === 0 &&
      Object.keys(nextCubGameData).length > 0
    ) {
      getCubGame();
    }
  }, [nextCubGameData]);

  useEffect(() => {
    if (!nextCubGameData?.gamePk) return;

    const intervalId = setInterval(() => {
      getCubGame();
    }, 8000); // fetch every 8 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [nextCubGameData]);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/Clouds.jpg")}
      style={styles.cloudImage}
    >

      <View style={styles.imageContainer}>
      {/*<video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      >
        <source src={require("@/assets/videos/Final Video Try 3.mp4")} type="video/mp4" />
      </video>*/}
        <ImageBackground
          source={require("@/assets/images/wrigley-no-clouds.png")}
          style={styles.image}
        >
        <View
          id="top"
          style={{
            position: "absolute",
            width: imageWidth,
            height: imageHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <TheCrown imageWidth={imageWidth} />
        </View>
        <View
          id="bottom"
          style={{
            position: "absolute",
            width: imageWidth,
            height: imageHeight,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            backgroundColor: "transparent",
            marginLeft: imageWidth / 20.7,
            marginTop: -(imageWidth / 11.9),
          }}
        >
          <View style={styles.container}>
            <ScoreBoardSingleSide
              imageWidth={imageWidth}
              game={nationalGames}
              cubs={cubGameData}
              title={{ text: "National", pos: "flex-end" }}
            />
            <View style={{  marginBottom: (imageWidth / 900) }} >
              <MiddleSection
                cubGameData={cubGameData}
                imageWidth={imageWidth}
                gamesToday={gamesToday}
              /></View>
            <View
              style={{
                justifyContent: "flex-end",
                marginLeft: imageWidth / 30,
              }}
            >
              <ScoreBoardSingleSide
                imageWidth={imageWidth}
                game={americanGames}
                cubs={null}
                title={{ text: "American", pos: "flex-start" }}
                rightSide={true}
              />
            </View>
          </View>
        </View>
        </ImageBackground>
      </View>

    </ImageBackground>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageAspectRatio = 1920 / 1080;
let imageHeight = screenWidth / imageAspectRatio;
let imageWidth = screenWidth;

if (imageHeight > screenHeight) {
  imageHeight = screenHeight;
  imageWidth = screenHeight * imageAspectRatio;
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "white",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  cloudImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flexDirection: "row",
  },
});
