import Chart from "chart.js";

export function drawChart(dailyData) {
  const chartCanvas = document.getElementById("jsPriceChart");

  let labels = [],
    data = [];

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
