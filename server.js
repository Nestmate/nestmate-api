const app = require("./app");
const io = app.io;
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

io.attach(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on("message", function (data) {
    io.emit("message", data);
  });
  socket.on('join', ({userId}) => {
    console.log('joined room', userId);
    socket.join(userId);
  });
  socket.on('join_chat', ({chatId}) => {
    console.log('joined chat room', chatId);
    socket.join(chatId);
  });
  socket.on('notification', (data) => {
    socket.emit('notification', data);
  });
  socket.on('disconnect', () => console.log('Client disconnected'))
})