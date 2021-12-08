const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dkssud12",
  port: 3306,
});

//회원가입 처리
exports.join = (req, res) => {
  console.log(req.body);
  var userEmail = req.body.userEmail;
  var userPwd = req.body.userPwd;
  var userID = req.body.userID;

  var sql = "INSERT INTO Users (UserEmail, UserPwd, userID) VALUES (?, ?, ?)";
  var parms = [userEmail, userID, userPwd];

  connection.query(sql, parms, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다.";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "회원가입에 성공했습니다.";
    }
    res.json({
      code: resultCode,
      message: message,
    });
  });
};

//로그인 처리
exports.login = (req, res) => {
  var userEmail = req.body.userEmail;
  var userPwd = req.body.userPwd;
  var sql = "select * from Users where UserEmail = ?";

  var parms = [userEmail, userName, userPwd];

  connection.query(sql, parms, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다.";

    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        resultCode = 204;
        message = "존재하지 않는 계정입니다!";
        res.send("존재하지 않는 계정입니다!");
      } else if (userPwd !== result[0].UserPwd) {
        resultCode = 204;
        message = "비밀번호가 틀렸습니다!";
        res.send("비밀번호가 틀렸습니다!");
      } else {
        resultCode = 200;
        message = "로그인 성공!";
        res.send(UserEmail + " 님이 로그인 하셨습니다.");
        res.end();
      }
    }

    res.json({
      code: resultCode,
      message: message,
    });
  });
};
