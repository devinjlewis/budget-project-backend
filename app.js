const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const dataController = require("./controllers/dataController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/todo", dataController);

module.exports = app;
