const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");
const filmlogsRouter = require("./routes/filmlogs");
const filmtalksRouter = require("./routes/filmtalks");
const filmlog_commentsRouter = require("./routes/filmlog_comments");
const filmtalk_commentsRouter = require("./routes/filmtalk_comments");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  })
);

// 정적 이미지 파일 불러오기 Router
app.use("/users/profile", express.static("uploads"));
app.use("/filmlogs/photo", express.static("photos"));
app.use("/filmtalks/image", express.static("images"));

//Node ailer
app.set('view engine', 'ejs');

//요청에 따른 분기
app.use("/users", usersRouter);
app.use("/filmlogs", filmlogsRouter);
app.use("/filmtalks", filmtalksRouter);
app.use("/filmlog_comments", filmlog_commentsRouter);
app.use("/filmtalk_comments", filmtalk_commentsRouter);



const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, function () {
    console.log(`HTTPS SERVER LISTENING ON https://localhost:${HTTPS_PORT}`)
  });
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log(`현재 HTTP로 서버가 실행 중입니다 보안에 유의하세요`)
  );
}
module.exports = server;
