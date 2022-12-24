/**
 * todo : add the apiRoutes function
 */
require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./routes");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);




app.use("/api", apiRoutes());

app.use((err, req, res, next) => {
  console.log("Time: ", Date.now());
  next();
  next(new Error(err.message));
});



app.listen(PORT, () => console.log(`app listening on port : ${PORT}`));
