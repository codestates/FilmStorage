const { users } = require("../../models");
const fs = require("fs");

// {
// "email" : "boo1996@naver.com",
// "password" : "1234abc!",
// "nickname" : "TeamWooga",
// "mobile" : "010-6354-9283"
// }
module.exports = {
  post: async (req, res) => {
    try {
      const { email, password, nickname, mobile } = req.body;

      const [userData, created] = await users.findOrCreate({
        where: {
          email,
          password,
          nickname,
          mobile,
        },
      });
      if (!created) {
        res.status(409).send({
          message: "nickname or email already exists",
        });
      } else {
        res.status(201).send({
          message: "Successfully Signed Up",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  profile: async (req, res) => {
    console.log(req.file);

    try {
      await users.update(
        {
          profile: `https://localhost:4000/users/profile/${req.file.filename}`,
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
        message: `Profile updated, filepath: ${req.file.path}`,
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
