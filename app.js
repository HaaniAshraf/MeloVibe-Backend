const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

const dbConnection = require("./config/db");

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./Router/userRouter");
app.use("/", userRouter);

dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`server connected on ${port}`);
    });
  })
  .catch(() => {
    console.log("error data base connection");
  });
