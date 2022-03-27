const { users } = require("../../models");

// {
// "email" : "boo1996@naver.com",
// "password" : "1234abc!",
// "nickname" : "TeamWooga",
// "mobile" : "010-6354-9283"
// }
module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        const [userinfo, created] = await users.findOrCreate({
            where: {
                email: req.body.email
            }
        })
        console.log('유저정보###', userinfo)
        res.send({ message: "Successfully signed Up" })
    },
}