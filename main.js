const socketLocal = new WebSocket("ws://127.0.0.1:8080");
const socketRemote = new WebSocket("ws://192.168.1.177:8080");

const heartRateHistory = [];

socketLocal.addEventListener("open", function (event) {
  console.log("Local WebSocket connection established.");
});

socketRemote.addEventListener("open", function (event) {
  console.log("Remote WebSocket connection established.");
});

socketLocal.addEventListener("message", function (event) {
  const heartRate = parseInt(event.data);
  updateHeartRate(heartRate);
});

//심박수
function updateHeartRate(heartRate) {
  document.getElementById("heart-rate-display").innerText = heartRate;
  heartRateHistory.push(heartRate);
  displayHeartRateHistory();
  displayHeartRateChart();

  if (heartRate > 100) {
    alert("Your heart rate is too high! Please take a break and relax.");
  }
}

//심박수 기록
function displayHeartRateHistory() {
  const historyElement = document.getElementById("heart-rate-history");
  historyElement.innerHTML = "";
  heartRateHistory.forEach((heartRate, index) => {
    const historyItem = document.createElement("div");
    historyItem.innerText = `Heart Rate ${index + 1}: ${heartRate} bpm`;
    historyElement.appendChild(historyItem);
  });
}

//심박수 그래프
function displayHeartRateChart() {
  const ctx = document.getElementById("heart-rate-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: heartRateHistory.map((_, index) => `Measurement ${index + 1}`),
      datasets: [
        {
          label: "Heart Rate",
          data: heartRateHistory,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
}

socketLocal.addEventListener("error", function (event) {
  console.error("WebSocket error:", event);
});

socketRemote.addEventListener("error", function (event) {
  console.error("WebSocket error:", event);
});

socketRemote.addEventListener("error", function (event) {
  console.error("WebSocket error:", event);
  alert("원격 소켓의 에러 발생 네트워크 연결 문제");
});
