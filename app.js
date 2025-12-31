function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    document.querySelectorAll("nav a").forEach(a => {
        a.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
    event.target.classList.add("active");
}

function getSentiment(change) {
    if (change > 0.7) return { label: "Bullish", class: "bullish" };
    if (change < -0.7) return { label: "Bearish", class: "bearish" };
    return { label: "Neutral", class: "neutral" };
}

function updateAISummary(segment, change, text) {
    const s = getSentiment(change);

    document.getElementById(`${segment}-summary`).innerHTML = `
        <div class="ai-summary">
            <strong>AI Market Summary</strong>
            <p>${text}</p>
            <span class="sentiment ${s.class}">${s.label}</span>
        </div>
    `;
}

updateAISummary(
    "finance",
    0.8,
    "Equity markets remain strong while bond yields stabilize."
);

updateAISummary(
    "crypto",
    -0.4,
    "Crypto markets consolidate as volatility cools."
);

updateAISummary(
    "markets",
    0.2,
    "Global markets show mixed signals amid macro uncertainty."
);

/* AUTO REFRESH EVERY 10 MINUTES */
setInterval(() => {
    location.reload();
}, 600000);
