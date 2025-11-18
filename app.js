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

