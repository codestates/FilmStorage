const { users } = require("../../models");
const { sign } = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "Invalid email or password" });
    } else {
      try {
        const userData = await users.findOne({
          where: {
            email,
            password,
          },
        });
        if (!userData) {
          res.status(404).send({ message: "No matching user information" });
        } else {
          // console.log("유저정보#######>>>", userData.dataValues);
          const accessToken = sign(
            userData.dataValues,
            process.env.ACCESS_SECRET,
            {
              expiresIn: 1000 * 60 * 60 * 2,
            }
          );

          res
            .status(200)
            .cookie("accessToken", accessToken, {
              sameSite: "none",
              domain: "localhost",
              path: "/",
              secure: true,
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 2,
            })
            .send({
              data: accessToken,
              message: "Successfully Logged In",
            });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  },

  kakao: async (req, res) => {
    // 인가 코드가 잘 받아와졌는지 확인
    // console.log(req.query);
    try {
      const oauthData = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code: req.query.code,
      };
      const url = `https://kauth.kakao.com/oauth/token?code=${oauthData.code}&client_id=${oauthData.client_id}&redirect_uri=${oauthData.redirect_uri}&grant_type=${oauthData.grant_type}`;

      const response = await axios.post(
        url,
        {},
        {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        }
      );

      const { access_token } = response.data;
      const getKakaoUserInfo = await axios.get(
        `https://kapi.kakao.com/v2/user/me`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { profile, email } = getKakaoUserInfo.data.kakao_account;

      let userInfo = await users.findOne({ where: { email } });

      if (!userInfo) {
        userInfo = await users.create({
          email: email,
          profile: profile.profile_image_url,
          nickname: profile.nickname,
          kakaouser: true,
        });
      }

      const accessToken = sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
        expiresIn: 1000 * 60 * 60 * 2,
      });

      res
        .status(200)
        .cookie("accessToken", accessToken, {
          sameSite: "none",
          domain: "localhost",
          path: "/",
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 2,
        })
        .send({
          message: "Logged in with your Kakao account",
        });
    } catch (err) {
      console.error(err);
      // req;
    }
  },
};
