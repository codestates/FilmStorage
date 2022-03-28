require("dotenv").config();
const { users } = require("../../models");
const { verify } = require("jsonwebtoken")

module.exports = {
  patch: async (req, res) => {
    const { nickname, mobile } = req.body
    //유저 토큰 해독 후 검증
    if (!req.cookies.accessToken) {
      res.status(400).send({
        data: null,
        message: 'not Authorized'
      });
    } else {
      try {
        const accessToken = req.cookies.accessToken;
        const decoded = verify(accessToken, process.env.ACCESS_SECRET);
        const userInfo = await users.findByPk(decoded.id)
        console.log(userInfo.dataValues);
        if (userInfo.dataValues.nickname === nickname) {
          res.status(409).json({
            data: null,
            message: "nickname already exists",
          });
        } else {
          await users.update({
            nickname,
            mobile
          },
            {
              where: {
                email: decoded.email
              }
            }
          )
        }
        const modifiedUserData = await users.findByPk(decoded.id);
        res.status(200).send({
          message: "ok",
          data: {
            userInfo: modifiedUserData
          }
        })

      } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },

  profile: async (req, res) => {

    try {
      await users.update(
        {
          profile: `${process.env.DOMAIN}/users/profiles/${req.file.filename}`,
        },
        {
          where: {
            id: req.params.user_id,
          },
        }
      );
      const getUpdatedUserInfo = await users.findOne({
        where: {
          id: req.params.user_id,
        },
      });

      res.status(201).json({
        message: "Profile has been updated",
        data: getUpdatedUserInfo.dataValues,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
