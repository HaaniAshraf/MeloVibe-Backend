const mongose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongose.connect(process.env.mongoUrl);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
