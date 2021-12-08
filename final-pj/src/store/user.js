const { apply } = require("core-js/fn/reflect");
var mysql = require("mysql");

// Connection 객체 생성
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dkssud12",
  database: "mydb",
  port: 3306,
});

//Connect
connection.connect(function (err) {
  if (err) {
    console.error("mysql connection error");
    console.error(err);
    throw err;
  }
});

//Insert

app.post("/user/join", function (req, res) {
  console.log(req.body);
  var userEmail = req.body.userEmail;
  var userPwd = req.body.userPwd;
  var userName = req.body.userName;

  //데이터 삽입을 수행하는 sql문
  var sql = "INSERT INTO Users (UserEmail, UserPwd, UserName) VALUES (?, ?, ?)";
  var params = [userEmail, userPwd, userName];

  //sql문에서 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
  connection.query(sql, params, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "회원가입에 성공했습니다.";
    }

    // 통신에 성공하면 json객체를 클라이언트 쪽으로 전송한다.
    res.json({
      code: resultCode,
      message: message,
    });
  });
});
