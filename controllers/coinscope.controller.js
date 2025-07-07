const BASE_URL = 'https://rest.coincap.io/v3';
const API_KEY = process.env.COINCAP_API_KEY;

function withApiKey(url) {
  if (API_KEY) {
    return url + (url.includes('?') ? '&' : '?') + `apiKey=${API_KEY}`;
  }
  return url;
}

export async function fetchAllCoins(req, res) {
  try {
    const url = withApiKey(`${BASE_URL}/assets`);
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from CoinCap' });
  }
}

export async function fetchCoinById(req, res) {
  try {
    const { id } = req.params;
    const url = withApiKey(`${BASE_URL}/assets/${id}`);
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coin details from CoinCap' });
  }
}

export async function fetchHourlyHistory(req, res) {
  try {
    const { id } = req.params;
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const url = withApiKey(`${BASE_URL}/assets/${id}/history?interval=h1&start=${oneDayAgo}&end=${now}`);
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hourly history from CoinCap' });
  }
}

export async function fetch7dHistory(req, res) {
  try {
    const { id } = req.params;
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const url = withApiKey(`${BASE_URL}/assets/${id}/history?interval=d1&start=${sevenDaysAgo}&end=${now}`);
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch 7d history from CoinCap' });
  }
}

export async function fetch30dHistory(req, res) {
  try {
    const { id } = req.params;
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const url = withApiKey(`${BASE_URL}/assets/${id}/history?interval=d1&start=${thirtyDaysAgo}&end=${now}`);
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch 30d history from CoinCap' });
  }
}

export async function fetch1yHistory(req, res) {
  try {
    const { id } = req.params;
    const now = Date.now();
    const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
    const url = withApiKey(`${BASE_URL}/assets/${id}/history?interval=d1&start=${oneYearAgo}&end=${now}`);
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch 1y history from CoinCap' });
  }
}