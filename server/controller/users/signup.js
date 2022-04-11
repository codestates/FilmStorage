const { users } = require("../../models");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  //회원가입 기능
  post: async (req, res) => {
    try {
      const { email, password, nickname, mobile } = req.body;

      const emailInfo = await users.findOne({
        where: { email },
      });
      const nicknameInfo = await users.findOne({
        where: { nickname },
      });

      if (emailInfo) {
        res.status(409).send({
          message: "email already exists",
        });
      } else if (nicknameInfo) {
        res.status(409).send({
          message: "nickname already exists",
        });
      } else {
        const [userData] = await users.findOrCreate({
          where: {
            email,
            password,
            nickname,
            mobile,
          },
        });

        const accessToken = sign(
          userData.dataValues,
          process.env.ACCESS_SECRET,
          {
            expiresIn: 1000 * 60 * 60 * 2,
          }
        );

        res
          .status(201)
          .cookie("accessToken", accessToken, {
            sameSite: "none",
            domain: "filmstorage.ga",
            path: "/",
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
          })
          .send({
            message: "Successfully Signed Up",
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
