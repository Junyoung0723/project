var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");

// post 요청 데이터를 추출
var bodyParser = require("body-parser");

var app = express();
var cors = require("cors");

app.use(cors()); // cors 이슈 해결
app.use(bodyParser.json()); // json형식으로 사용
app.use(
  bodyParser.urlencoded({
    // extended : 중첩된 객체표현을 허용할지 말지를 정하는 것
    // true : qs 모듈을 사용
    // false : query-string 모듈을 사용
    extended: false,
  })
);
//서버를 실행합니다.
app.listen(3001, function () {
  console.log("서버 열림 >> http://192.168.219.103:3001");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var Router = require("./routes");
app.use("/", Router);
