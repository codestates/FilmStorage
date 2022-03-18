const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/Users")
const galleriesRouter = require("./routes/Galleries")
const boardsRouter = require("./routes/Boards")
const gallery_commentsRouter = require("./routes/Gallery_comments")
const board_commentsRouter = require("./routes/Board_comments")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
  })
);

app.use("/users", usersRouter);
app.use("/galleries", galleriesRouter);
app.use("/boards", boardsRouter);
app.use("/galley_comments", gallery_commentsRouter);
app.use("/board_comments", board_commentsRouter);


const HTTPS_PORT = process.env.HTTPS_PORT || 80;

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(`HTTPS SERVER LISTENING ON https://localhost:${HTTPS_PORT}`)
  );
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log(`현재 HTTP로 서버가 실행 중입니다 보안에 유의하세요`)
  );
}
module.exports = server;
