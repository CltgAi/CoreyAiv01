// Mock KPI Data
let data = {
  revenue: "$1,240,000",
  users: "12,842",
  crypto: "BTC 43,120 USD",
  growth: "+14.2%"
};

// Insert KPI values
document.getElementById("revenue").innerText = data.revenue;
document.getElementById("users").innerText = data.users;
document.getElementById("crypto").innerText = data.crypto;
document.getElementById("growth").innerText = data.growth;

// Navigation handler
function navigate(section) {
  window.location.href = section + ".html";
}

// Chart.js Example
const ctx = document.getElementById("mainChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Revenue",
      data: [120, 190, 300, 500, 200, 300, 700],
      borderWidth: 3,
      borderColor: "white",
      tension: 0.3
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});
