import Chart from "chart.js";

const chartCanvas = document.getElementById("jsPriceChart");

async function fetchStockData() {
  const symbol = window.location.href.split("stocks")[1];
  const response = await fetch(`/api/getDaily${symbol}`);
  return await response.json();
}

async function drawChart() {
  let labels = [],
    data = [];

  const dailyData = await fetchStockData();
  for (const element of dailyData.datePriceArray) {
    labels.push(element.date);
    data.push(element.price);
  }

  const context = chartCanvas.getContext("2d");
  const chart = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: dailyData.symbol,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data
        }
      ]
    }
  });
}

if (chartCanvas) {
  drawChart();
}
