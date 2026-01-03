function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
  event.target.classList.add("active");
}

function openFinanceTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

function togglePro() {
  document.body.classList.toggle("pro");
}

function loadDashboard() {
  document.getElementById("dashboard-summary").innerHTML = `
    <h3>AI Market Summary</h3>
    <p>Markets show measured optimism. Equities lead risk appetite, crypto stabilizes, while bond yields remain the key macro driver.</p>
  `;

  document.getElementById("ai-alert-list").innerHTML = `
    <li>📈 Equity momentum strengthening</li>
    <li>⚠️ Crypto volatility elevated</li>
    <li>📉 Rising yields pressure growth stocks</li>
    <li>🧠 AI suggests balanced allocation</li>
  `;
}

document.addEventListener("DOMContentLoaded", loadDashboard);

