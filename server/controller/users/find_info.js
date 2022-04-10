require("dotenv").config();
const nodemailer = require("nodemailer");
const { users } = require("../../models");
const transporter = nodemailer.createTransport({
  service: "gmail", // 이메일
  auth: {
    user: process.env.MAIL_ID, // 발송자 이메일
    pass: process.env.MAIL_PASSWORD, // 발송자 비밀번호
  },
});

module.exports = {
  //이메일 전송을 통한 비밀번호 찾기 기능
  find_password: async (req, res) => {
    const userEmail = await users.findOne({
      where: {
        email: req.query.email,
      },
    });
    const password = userEmail.password;
    const nickname = userEmail.nickname;
    if (!userEmail) {
      res.status(404).send({ message: "No matching user information" });
    } else {
      try {
        const mailOptions = {
          from: process.env.MAIL_ID,
          to: req.query.email,
          subject: "FilmStorage 비밀번호 찾기 인증 메일입니다",
          html: `<h3>이메일 인증</h3>
              <div>
                ${nickname}님의 현재 비밀번호는 ${password} 입니다.
                <br/>
                <a href="https://localhost:3000/signin">로그인 하러가기</a>
              </div>`,
        };
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({
          message: "ok",
          data: info,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },

  find_email: async (req, res) => {
    try {
      const { nickname, mobile } = req.query;
      console.log(nickname, mobile);

      const findMatchedEmail = await users.findOne({
        attributes: ["email"],
        where: {
          nickname,
          mobile,
        },
      });
      if (!findMatchedEmail) {
        res.status(404).send({
          message: "No matching user information",
        });
      } else {
        res.status(200).send({
          message: "ok",
          data: findMatchedEmail,
        });
      }
    } catch (err) {}
  },
};
