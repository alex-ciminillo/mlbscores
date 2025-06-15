import axios from 'axios';

const formatLocalDate = (date: Date): string =>
  date.toLocaleDateString('en-CA'); // YYYY-MM-DD

const getStartDateWith9amRule = (): string => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // local midnight
  if (now.getHours() < 9) {
    date.setDate(date.getDate() - 1);
  }
  return formatLocalDate(date);
};

export const getMLBGamesToday = async () => {
  const url = 'https://statsapi.mlb.com/api/v1/schedule';
  const params = {
    sportId: 1,
    date: getStartDateWith9amRule(),
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching MLB games:', error);
  }
};

export const getMLBGamesYesterday = async () => {
  const url = 'https://statsapi.mlb.com/api/v1/schedule';
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const params = {
    sportId: 1,
    date: formatLocalDate(yesterday),
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching MLB games:', error);
  }
};

export const getLiveGameData = async (gamePk: string) => {
  const url = `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching live game data:', error);
  }
};

export const getUpcomingMLBGamesThisWeek = async () => {
  const url = 'https://statsapi.mlb.com/api/v1/schedule';

  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 7);

  const params = {
    sportId: 1,
    startDate: formatLocalDate(today),
    endDate: formatLocalDate(end),
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming MLB games:', error);
  }
};

export const getUpcomingMLBGamesThisMonth = async () => {
  const url = 'https://statsapi.mlb.com/api/v1/schedule';

  const startDate = getStartDateWith9amRule();
  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() + 30);
  const endDate = formatLocalDate(endDateObj);

  const params = {
    sportId: 1,
    startDate,
    endDate,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming MLB games:', error);
  }
};
