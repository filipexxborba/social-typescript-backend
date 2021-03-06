const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/Auth");
const postsRoute = require("./routes/Post");

mongoose.connect(process.env.DB_CONNECTIONSTRING);
const db = mongoose.connection;

db.once("open", () =>
  console.log(`Conexão com o banco de dados efetuada com sucesso`)
);

const server = express();
const port = process.env.SERVER_PORT || 8877;

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routes
server.use("/auth", authRoute);
server.use("/posts", postsRoute);

server.get("/", (_, res) => {
  res.status(200).send("Ok");
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`🏆 Servidor rodando na porta: ${port}`)
);
