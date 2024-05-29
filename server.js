const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("클라이언트가 연결되었습니다.");

  ws.on("message", function incoming(message) {
    console.log("클라이언트로부터 메시지 수신:", message);
  });

  ws.send("서버에 연결되었습니다.");
});
