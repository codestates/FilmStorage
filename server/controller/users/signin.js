const { users } = require('../../models');
const { sign } = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).send({ message: "Invalid email or password" })
        } else {
            try {
                const userData = await users.findOne({
                    where: {
                        email,
                        password
                    }
                })
                if (!userData) {
                    res.status(404).send({ message: "No matching user information" })
                } else {
                    console.log('유저정보#######>>>', userData.dataValues)
                    const accessToken = sign(userData.dataValues, process.env.ACCESS_SECRET, {
                        expiresIn: 60 * 60
                    })
                    // const accessToken = sign(, process.env.ACCESS_SECRET,
                    // )
                    res.status(200)
                        .cookie("accessToken", accessToken, {
                            sameSite: "none",
                            domain: "localhost",
                            path: "/",
                            secure: true,
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 2
                        })
                        .send({
                            message: "Successfully Logged In",
                        });
                }
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: "Internal Server Error" });
            }
        }
    }
}