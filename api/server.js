const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv/config");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const conversationRoute = require("./src/routes/conversation");
const messageRoute = require("./src/routes/message");

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

app.get("/api", (req, res) => {
  let env = process.env.DB_NAME;
  res.send(`hello world ${env}`);
});

const server = process.env.DB_SERVER + process.env.DB_NAME; //btter in env
mongoose.connect(server, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", () => console.log("ERROR connect to db!!"));
mongoose.connection.once("open", () => console.log("success connect to db"));

app.listen(9000, () => {
  console.log("run in port 9000");
});
