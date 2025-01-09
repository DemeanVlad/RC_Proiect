const express = require("express");
const { SerialPort, ReadlineParser } = require("serialport");
const WebSocket = require("ws");

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Create a SerialPort connection
const serialPort = new SerialPort({
  path: "/dev/cu.usbserial-1140", // Replace with your Arduino's port
  baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  // Send data from Arduino to the WebSocket
  parser.on("data", (data) => {
    console.log("Data from Arduino:", data);
    ws.send(data); // Send data to the client
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
