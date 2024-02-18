import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log(wss.clients.size);
  ws.on("message", (message) => {
    console.log("Received message:", message);
    wss.clients.forEach((client) => {
      if (client !== ws) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
  console.log("WebSocket connection open");

  ws.on("disconnect", () => {
    console.log("WebSocket connection closed");
  });
});

console.log("WebSocket server started on port 8080");
