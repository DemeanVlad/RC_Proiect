let socket;
const motionStatus = document.getElementById("motionStatus");
const eventLogs = document.getElementById("eventLogs");

document.getElementById("start").addEventListener("click", () => {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    const data = event.data;
    motionStatus.textContent = data;
    eventLogs.value += `${new Date().toLocaleTimeString()}: ${data}\n`;
    eventLogs.scrollTop = eventLogs.scrollHeight; // Auto-scroll to the latest log
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
});

document.getElementById("stop").addEventListener("click", () => {
  if (socket) {
    socket.close();
    motionStatus.textContent = "Monitoring stopped";
  }
});