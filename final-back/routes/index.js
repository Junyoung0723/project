var express = require("express");
var router = express.Router();
var socketio = require("socketio");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//웹서버 생성
const httpServer = http.createServer(app);

//소켓 서버를 생성하고 실행
const io = socketio(httpServer);
io.socket.on("connection", (socket) => {
  socket.on("rint", (data) => {
    console.log("Client Send Data : ", data);
  });
});

module.exports = router;
