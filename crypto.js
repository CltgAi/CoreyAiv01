document.addEventListener("DOMContentLoaded", () => {
    loadCrypto("bitcoin", "btcPrice", "btcChange");
    loadCrypto("ethereum", "ethPrice", "ethChange");
    loadCrypto("ripple", "xrpPrice", "xrpChange");
});

async function loadCrypto(id, priceID, changeID) {
    const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`;

    const crypto = await safeFetchJSON(url);
    if (!crypto || !crypto.market_data) {
        document.getElementById(priceID).innerText = "N/A";
        document.getElementById(changeID).innerText = "N/A";
        return;
    }

    document.getElementById(priceID).innerText = `$${crypto.market_data.current_price.usd}`;
    document.getElementById(changeID).innerText = `${crypto.market_data.price_change_percentage_24h.toFixed(2)}%`;
}
