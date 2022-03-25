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
};
