const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const symbol = req.query.symbol || "AAPL";

        const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;

        const response = await axios.get(url);

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");

        res.status(200).json(response.data.quoteResponse.result[0
const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const symbol = req.query.symbol || "AAPL";

        const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;

        const response = await axios.get(url);

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");

        res.status(200).json(response.data.quoteResponse.result[0
