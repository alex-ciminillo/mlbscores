import axios from 'axios';


// Start date should always be the past 9 AM time of the local timezone
export const getMLBGamesToday = async () => {
  const url = 'https://statsapi.mlb.com/api/v1/schedule';

  {/*const today = new Date();
  let startDate;
  // if current time is past 9 am
  if (today.getHours() >= 9) {
    startDate = new Date(today.toISOString().split('T')[0]).toISOString().split('T')[0];

  } else {
// startDate will be yesterday at midnight
    startDate = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];

  }*/}
  const today = new Date();
  let startDate;
  if (today.getHours() >= 9) {
    startDate = new Date(today.toISOString().split('T')[0]).toISOString().split('T')[0];
  } else {
    startDate = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];
  }

  const params = {
    sportId: 1, 
    date: startDate,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data
  } catch (error) {
    console.error('Error fetching MLB games:', error);
  }
};
// getMLBGamesYesterday
export const getMLBGamesYesterday = async () => {
  const url = 'https://statsapi.mlb.com/api/v1/schedule';
  const params = {
    sportId: 1, 
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
  };

  try {
    const response = await axios.get(url, { params });
    return response.data
  } catch (error) {
    console.error('Error fetching MLB games:', error);
  }
};


export const getLiveGameData = async (gamePk: string) => {
    const url = `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`;

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.error('Error fetching live game data:', error);
    }
};

// Start date should always be the past 9 AM time of the local timezone
export const getUpcomingMLBGamesThisWeek = async () => {
    const url = 'https://statsapi.mlb.com/api/v1/schedule';
    const params = {
        sportId: 1, // MLB sport ID
        startDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // One week from today
    };

    try {
        const response = await axios.get(url, { params });
        return response.data
    } catch (error) {
        console.error('Error fetching upcoming MLB games:', error);
    }
};

export const getUpcomingMLBGamesThisMonth = async () => {
    const url = 'https://statsapi.mlb.com/api/v1/schedule';
    const today = new Date();
    let startDate;
    // if current time is past 9 am
    if (today.getHours() >= 9) {
      startDate = new Date(today.toISOString().split('T')[0]).toISOString().split('T')[0];

    } else {
// startDate will be yesterday at midnight
      startDate = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];

    }
    const endDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const params = {
        sportId: 1, // MLB sport ID
        startDate,
        endDate,
    };

    try {
        const response = await axios.get(url, { params });
        return response.data
    } catch (error) {
        console.error('Error fetching upcoming MLB games:', error);
    }
};




















