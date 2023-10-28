const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const handleAddUserIds = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const handleRemoveUser = (socketId) => {
  const filtered = users.filter((user) => user.socketId !== socketId);
  users = filtered;
  console.log(users);
};

io.on("connection", (socket) => {
  //toall client
  // io.emit("wellcome", "hellow this is server socket ");
  //when connect
  socket.on("addUser", (id) => {
    //add/push to array
    if (id) handleAddUserIds(id, socket.id);
    console.log(users.length, "<<<<<<USER LENGTH");
    //throw back to client
    io.emit("getUser", users);
  });

  // send and get messages
  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, text, conversationId }) => {
      console.log(text);
      let receiver = await users.find((u) => u.userId === receiverId);
      console.log(receiver, "<<<reveicer find");
      console.log(conversationId, "conversationId IS EXIST");
      if (receiver) {
        io.to(receiver.socketId).emit("getMessage", {
          senderId,
          receiverId,
          text,
          conversationId,
        });
      } else {
        console.log("receiver is offline");
      }
    }
  );

  //   handle user disconnected
  socket.on("disconnect", async () => {
    await handleRemoveUser(socket.id);
    console.log(socket.id, "disconnected");
    console.log(users.length, "<<<<<<<<length user>>>>>>>>");
    await io.emit("getUser", users);
  });
});
