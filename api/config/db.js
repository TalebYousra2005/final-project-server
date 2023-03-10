const mongoose = require("mongoose");
const { MONGO_PROD_URL } = process.env;
const { MONGO_DEV_URL } = process.env;
exports.connect = () => {
  mongoose
    .connect(
      MONGO_PROD_URL
      // MONGO_DEV_URL
      , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err.reason);
    });
};
