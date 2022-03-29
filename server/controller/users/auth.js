const { users } = require('../../models')
const { verify } = require("jsonwebtoken")
require("dotenv").config();


//{
// "email" : "boo1996@naver.com"   
//}

module.exports = {
  get: async (req, res) => {
    // console.log("헤더에 담긴 쿠키", req.headers.authorization.split("Bearer ")[1]);
    // console.log("쿠키스토리지에 담긴 쿠키", req.cookies.accessToken);
    // console.log(req.headers.authorization)
    if (!req.cookies.accessToken) {
      res.status(401).json({
        data: null,
        message: "not Authorized",
      });
    } else {
      try {
        const accessToken = req.cookies.accessToken
        console.log("클라이언트에서 보낸 토큰", accessToken)
        const decoded = verify(accessToken, process.env.ACCESS_SECRET);
        console.log("해독된 토큰 정보", decoded)
        const userData = await users.findOne({
          where: {
            email: decoded.email
          },
        })
        if (!userData) {
          res.status(404).send({ message: "No matching user information" })
        } else {
          res.status(200).send({
            data: userData.dataValues,
            message: "ok"
          })
          console.log("토큰을 해독한 후 얻은 유저정보###>", userData)
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }
}