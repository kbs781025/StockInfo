const chartCanvas = document.getElementById("jsPriceChart");

function init() {
  const socket = io();
  socket.on("Event", data => {
    console.log(data);
  });
}

if (chartCanvas) {
  init();
}
