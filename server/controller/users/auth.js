const { users } = require('../../models')
const { verify } = require("jsonwebtoken")
require("dotenv").config();


module.exports = {
  //로그인 인증 기능
  get: async (req, res) => {
    if (!req.cookies.accessToken) {
      res.status(401).json({
        data: null,
        message: "not Authorized",
      });
    } else {
      try {
        const accessToken = req.cookies.accessToken
        const decoded = verify(accessToken, process.env.ACCESS_SECRET);
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
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }
}