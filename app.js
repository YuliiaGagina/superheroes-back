const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
dotenv.config();
const { DB_HOST, PORT = 8800 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Connected to mango");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const express = require("express");
const logger = require("morgan");

const cors = require("cors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/public", express.static(__dirname + "/public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const authRouter = require("./routes/api/auth");
// const usersRouter = require("./routes/api/users");
const superheroesRouter = require("./routes/api/superheroes");

// app.use("/api/auth", authRouter);
// app.use("/api/users", usersRouter);

app.use("/api/superheroes", superheroesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
