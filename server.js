const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  global.io = io;

  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
    });
  });

  server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
});