const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTIONSTRING);
const db = mongoose.connection;

db.once("open", () =>
  console.log(`Conexão com o banco de dados efetuada com sucesso`)
);

const server = express();
const port = process.env.SERVER_PORT || 9999;

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
