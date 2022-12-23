/**
 * todo : add the apiRoutes function
 */
require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
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

// * creating the http server
// const server = http.createServer(app);

//* a variable to deal with socket io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`user connected ${socket.id}`);
// });

// io.on("send_message",(data)=>{
//   socket.brodcast.emit("receive_message",data)
// })

app.use("/api", apiRoutes());

app.use((err, req, res, next) => {
  console.log("Time: ", Date.now());
  next();
  next(new Error(err.message));
});

// app.use((err, req, res, next) => {
//   // Error goes via `next()` method

//   next(new Error(err.message));
// });

// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
//   console.log(res);
// });

app.listen(PORT, () => console.log(`app listening on port : ${PORT}`));
