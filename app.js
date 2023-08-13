const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const transactionsController = require("./controllers/transactionsController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsController);

module.exports = app;
