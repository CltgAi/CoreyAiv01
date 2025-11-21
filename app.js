/* ------------------------------
   PAGE SECTION SWITCHER
--------------------------------*/

function openSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = "none");

    document.getElementById(id).style.display = "block";
    document.getElementById("pageTitle").innerText = id.toUpperCase();
}

/* ------------------------------
   LIVE FINANCE (STOCK SIMULATION)
--------------------------------*/

let stockCtx = document.getElementById("stockChart");

let stockChart = new Chart(stockCtx, {
    type: "line",
    data: {
        labels: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"],
        datasets: [{
            label: "Stock Prices (Simulated)",
            data: [182, 323, 141, 178, 214],
            borderWidth: 3,
            borderColor: "#00aaff"
        }]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: false } }
    }
});

/* ------------------------------
   LIVE CRYPTO (SIMULATION)
--------------------------------*/

let cryptoCtx = document.getElementById("cryptoChart");

let cryptoChart = new Chart(cryptoCtx, {
    type: "bar",
    data: {
        labels: ["BTC", "ETH", "ADA", "XRP", "SOL"],
        datasets: [{
            label: "Crypto Prices (Simulated)",
            data: [42150, 2400, 0.52, 0.68, 102],
            backgroundColor: "#415a77"
        }]
    },
    options: {
        responsive: true
    }
});

/* ------------------------------
   LIVE MARKET STATUS (TEXT)
--------------------------------*/

document.getElementById("liveMarketBox").innerHTML =
    "<b>Stocks:</b> Mixed • <b>Crypto:</b> Slightly Up • <b>Gold:</b> Stable";
/* -----------------------------------------
   LIVE MARKET FEED (STOCKS + CRYPTO)
   Auto-update every 30 seconds
----------------------------------------- */

async function updateLiveMarket() {

    // ------------ STOCKS (Yahoo Finance) ----------------
    const stockUrl = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,MSFT,TSLA,AMZN";

    let stockData;
    try {
        let stockRes = await fetch(stockUrl);
        let stockJson = await stockRes.json();
        stockData = stockJson.quoteResponse.result;
    } catch (e) {
        console.error("Stock API error:", e);
    }

    // ------------ CRYPTO (CoinGecko) ----------------
    const cryptoUrl =
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,xrp&vs_currencies=usd";

    let cryptoData;
    try {
        let cryptoRes = await fetch(cryptoUrl);
        cryptoData = await cryptoRes.json();
    } catch (e) {
        console.error("Crypto API error:", e);
    }


    // ------------ BUILD DISPLAY BOX ----------------

    let html = `<h3>📈 Live Market Status</h3>`;

    if (stockData) {
        html += `<b>Stocks:</b><br>`;
        stockData.forEach(stock => {
            html += `${stock.symbol}: <span style="color:#00ffea">$${stock.regularMarketPrice}</span><br>`;
        });
        html += `<br>`;
    }

    if (cryptoData) {
        html += `<b>Crypto:</b><br>`;
        html += `BTC: <span style="color:#ffaa00">$${cryptoData.bitcoin.usd}</span><br>`;
        html += `ETH: <span style="color:#ffaa00">$${cryptoData.ethereum.usd}</span><br>`;
        html += `SOL: <span style="color:#ffaa00">$${cryptoData.solana.usd}</span><br>`;
        html += `XRP: <span style="color:#ffaa00">$${cryptoData.xrp.usd}</span><br>`;
    }

    document.getElementById("liveMarketBox").innerHTML = html;
}

// Run immediately
updateLiveMarket();

// Update every 30 seconds
setInterval(updateLiveMarket, 30000);

function buildMarketHTML(dataObj) {
    let html = "";
    for (let key in dataObj) {
        html += `
            <div class="market-item">
                <div>${key}</div>
                <span>$${dataObj[key]}</span>
            </div>
        `;
    }
    return html;
}
async function loadFinanceData() {

    /* -----------------------------------
        1. STOCK MARKETS (Yahoo Finance)
    -------------------------------------*/
    const stockSymbols = "AAPL,MSFT,TSLA,AMZN,NVO.CO,MAERSK-B.CO,VWS.CO,BMW.DE,SAP.DE,SONY,INFY.NS";
    const stockURL = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stockSymbols}`;

    let stockRes = await fetch(stockURL).then(r => r.json());
    let stocks = {};

    stockRes.quoteResponse.result.forEach(s => {
        stocks[s.symbol] = s.regularMarketPrice;
    });

    document.getElementById("market-stocks").innerHTML = buildMarketHTML(stocks);


    /* -----------------------------------
        2. INDEXES (Yahoo Finance)
    -------------------------------------*/
    const indexSymbols = "^NDX,^GSPC,^GDAXI,^FTSE,^N225,^STOXX50E";
    const indexURL = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${indexSymbols}`;

    let indexRes = await fetch(indexURL).then(r => r.json());
    let indexes = {};

    indexRes.quoteResponse.result.forEach(s => {
        indexes[s.shortName] = s.regularMarketPrice;
    });

    document.getElementById("market-index").innerHTML = buildMarketHTML(indexes);


    /* -----------------------------------
        3. FOREX (Yahoo Finance)
    -------------------------------------*/
    const forexSymbols = "EURUSD=X,USDJPY=X,GBPUSD=X";
    const forexURL = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${forexSymbols}`;

    let forexRes = await fetch(forexURL).then(r => r.json());
    let forex = {};

    forexRes.quoteResponse.result.forEach(s => {
        forex[s.symbol] = s.regularMarketPrice;
    });

    document.getElementById("market-forex").innerHTML = buildMarketHTML(forex);


    /* -----------------------------------
        4. CRYPTO (CoinGecko)
    -------------------------------------*/
    const cryptoURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,xrp&vs_currencies=usd";

    let cryptoRes = await fetch(cryptoURL).then(r => r.json());
    let crypto = {
        BTC: cryptoRes.bitcoin.usd,
        ETH: cryptoRes.ethereum.usd,
        SOL: cryptoRes.solana.usd,
        XRP: cryptoRes.xrp.usd
    };

    document.getElementById("market-crypto").innerHTML = buildMarketHTML(crypto);


    /* -----------------------------------
        5. COMMODITIES (Free API)
    -------------------------------------*/
    const commoditiesURL = "https://api.exchangerate.host/latest?base=USD";
    let commoditiesRes = await fetch(commoditiesURL).then(r => r.json());

    let commodities = {
        GOLD: (feeds = 2030), // can replace with paid API later
        SILVER: 24.8,
        OIL_WTI: 79.3,
        OIL_BRENT: 83.2
    };

    document.getElementById("market-commodities").innerHTML = buildMarketHTML(commodities);

}
loadFinanceData();
setInterval(loadFinanceData, 30000);

async function loadFinanceData() {

    /* HELPER: Build rows */
    function buildMarketHTML(dataObj) {
        let html = "";
        for (let key in dataObj) {
            html += `
                <div class="market-item">
                    <div>${key}</div>
                    <span>$${dataObj[key]}</span>
                </div>
            `;
        }
        return html;
    }

    /* -----------------------------------
        1. STOCK MARKETS
    -------------------------------------*/
    try {
        const stocksURL = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,MSFT,TSLA,AMZN,NVO.CO,MAERSK-B.CO,VWS.CO,BMW.DE,SAP.DE,SONY,INFY.NS";

        let stockRes = await fetch(stocksURL, { headers: { "User-Agent": "Mozilla/5.0" } })
            .then(r => r.json());

        let stocks = {};
        stockRes.quoteResponse.result.forEach(s => {
            stocks[s.symbol] = s.regularMarketPrice ?? "N/A";
        });

        document.getElementById("market-stocks").innerHTML = buildMarketHTML(stocks);
    } catch (e) {
        document.getElementById("market-stocks").innerHTML = "Error loading stocks.";
    }


    /* -----------------------------------
        2. INDEXES
    -------------------------------------*/
    try {
        const indexURL = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^NDX,^GSPC,^GDAXI,^FTSE,^N225,^STOXX50E";

        let indexRes = await fetch(indexURL, { headers: { "User-Agent": "Mozilla/5.0" } })
            .then(r => r.json());

        let indexes = {};
        indexRes.quoteResponse.result.forEach(s => {
            indexes[s.shortName] = s.regularMarketPrice ?? "N/A";
        });

        document.getElementById("market-index").innerHTML = buildMarketHTML(indexes);
    } catch (e) {
        document.getElementById("market-index").innerHTML = "Error loading indexes.";
    }


    /* -----------------------------------
        3. FOREX PAIRS
    -------------------------------------*/
    try {
        const forexURL = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=EURUSD=X,USDJPY=X,GBPUSD=X";

        let forexRes = await fetch(forexURL, { headers: { "User-Agent": "Mozilla/5.0" } })
            .then(r => r.json());

        let forex = {};
        forexRes.quoteResponse.result.forEach(s => {
            forex[s.symbol] = s.regularMarketPrice ?? "N/A";
        });

        document.getElementById("market-forex").innerHTML = buildMarketHTML(forex);
    } catch (e) {
        document.getElementById("market-forex").innerHTML = "Error loading forex.";
    }


    /* -----------------------------------
        4. CRYPTO PRICES (CoinGecko)
    -------------------------------------*/
    try {
        const cryptoURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,xrp&vs_currencies=usd";

        let cryptoRes = await fetch(cryptoURL)
            .then(r => r.json());

        let crypto = {
            BTC: cryptoRes.bitcoin.usd,
            ETH: cryptoRes.ethereum.usd,
            SOL: cryptoRes.solana.usd,
            XRP: cryptoRes.xrp.usd
        };

        document.getElementById("market-crypto").innerHTML = buildMarketHTML(crypto);
    } catch (e) {
        document.getElementById("market-crypto").innerHTML = "Error loading crypto.";
    }


    /* -----------------------------------
        5. COMMODITIES
    -------------------------------------*/
    let commodities = {
        GOLD: 2030,
        SILVER: 24.8,
        OIL_WTI: 79.3,
        OIL_BRENT: 83.2
    };

    document.getElementById("market-commodities").innerHTML = buildMarketHTML(commodities);

}

/* AUTO REFRESH */
loadFinanceData();
setInterval(loadFinanceData, 30000);

async function loadLiveStocks() {
    const tickers = ["AAPL.US", "TSLA.US", "MSFT.US", "NVDA.US", "AMZN.US"];

    const stockContainer = document.getElementById("live-stock-feed");
    stockContainer.innerHTML = `<p style="color:white;">Loading...</p>`;

    try {
        let html = "";
        for (let t of tickers) {
            const url = `https://stooq.com/q/l/?s=${t}&f=sd2t2ohlcv&h&e=json`;
            const res = await fetch(url);
            const data = await res.json();
            const s = data[0];

            html += `
                <div class="stock-item">
                    <h4>${s.symbol}</h4>
                    <p>Price: ${s.close}</p>
                    <p>Open: ${s.open}</p>
                    <p>High: ${s.high}</p>
                    <p>Low: ${s.low}</p>
                </div>
            `;
        }
        stockContainer.innerHTML = html;

    } catch (err) {
        stockContainer.innerHTML = `<p style="color:red;">Error loading live stocks</p>`;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadLiveStocks();
    setInterval(loadLiveStocks, 60000); // update every 60 seconds
});


