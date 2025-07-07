export const getAllCoins = async (req, res) => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        const response = await fetch(url);
        const data = await response.json();
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data from CoinGecko' });
    }
}

export const getOneCoin = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const url = `https://api.coingecko.com/api/v3/coins/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch coin details from CoinGecko' });
    }
}

export const getPricesHistory = async (req, res) => {
    const { id } = req.params;
    const { vs_currency, days, interval } = req.query;
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${interval}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch market chart data' });
    }
}