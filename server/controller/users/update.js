require("dotenv").config();
const { users } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = {
  //회원정보 수정 기능 
  patch: async (req, res) => {
    const { nickname, mobile } = req.body;
    if (!req.cookies.accessToken) {
      res.status(400).send({
        data: null,
        message: "not Authorized",
      });
    } else {
      try {
        const accessToken = req.cookies.accessToken;
        const decoded = verify(accessToken, process.env.ACCESS_SECRET);
        const userInfo = await users.findByPk(decoded.id);
        if (userInfo.dataValues.nickname === nickname) {
          res.status(409).json({
            data: null,
            message: "nickname already exists",
          });
        } else {
          await users.update(
            {
              nickname,
              mobile,
            },
            {
              where: {
                email: decoded.email,
              },
            }
          );
        }
        const modifiedUserData = await users.findByPk(decoded.id);
        res.status(200).send({
          message: "ok",
          data: {
            userInfo: modifiedUserData,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },
  // 프로필 사진 수정 기능
  profile: async (req, res) => {
    try {
      await users.update(
        {
          profile: `${process.env.SERVER_DOMAIN}/users/profiles/${req.file.filename}`,
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
  // 비밀번호 수정 기능
  password: async (req, res) => {
    try {
      const { accessToken } = req.cookies;
      const { curPw, changePw } = req.body;
      const decoded = verify(accessToken, process.env.ACCESS_SECRET);
      const userInfo = await users.findByPk(decoded.id);

      console.log(req.body);
      console.log(userInfo.password)

      if (userInfo.password !== curPw) {
        return res.status(400).send({
          message: "Wrong Password",
        });
      } else {
        await users.update(
          {
            password: changePw,
          },
          {
            where: {
              id: userInfo.id,
            },
          }
        );

        res.status(200).send({
          message: "Successfully modified",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
