const { users } = require('../../models')

// {
// "email" : "boo1996@naver.com",
// "password" : "1234abc!",
// "nickname" : "TeamWooga",
// "mobile" : "010-6354-9283"
// }
module.exports = {
    post: async (req, res) => {
        const { email, password, nickname, mobile } = req.body
        if (!email || !password || !nickname || !mobile) {
            res.send({ massage: "Invalid [email / password / mobile]. please check it again" })
        } else {
            try {
                const { userData, created } = await users.findOrCreate({
                    where: {
                        email,
                        password,
                        nickname,
                        mobile
                    }
                })
                if (!created) {
                    res.send({ message: "nickname or email already exists" })
                } else {
                    res.send({ message: "Successfully Signed Up" })
                    console.log(created)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}