const { users } = require("../../models");
const { sign } = require('jsonwebtoken');
require("dotenv").config();
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
                console.log('유저정보#######>>>', userData.dataValues)
                const accessToken = sign(userData.dataValues, process.env.ACCESS_SECRET, {
                    expiresIn: 60 * 60
                })
                // const accessToken = sign(, process.env.ACCESS_SECRET,
                // )
                res.status(201)
                    .cookie("accessToken", accessToken, {
                        sameSite: "none",
                        domain: "localhost",
                        path: "/",
                        secure: true,
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 2
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
}
