const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cache = require("nocache");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const dbConnection = require("./config/db");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cache());
app.use(express.static("Public"));

const userRouter = require("./Router/userRouter");
const artistRouter = require("./Router/artistRouter");
app.use("/", userRouter);
app.use("/artist", artistRouter);

dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`server connected on ${port}`);
    });
  })
  .catch(() => {
    console.log("error data base connection");
  });