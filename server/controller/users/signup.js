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
    },
    profile: async (req, res) => {
        console.log(req.params);
        console.log('요청받은 이미지 파일명#####>', req.file.filename)
        console.log('요청받은 이미지 파일경로@@@@', req.file.path)

        try {
            await users.update(
                {
                    profile:
                        `https://localhost:4000/${req.file.filename}`,
                },
                {
                    where: {
                        id: req.params.user_id
                    },
                }
            );
            const getUpdatedUserInfo = await users.findOne({
                where: {
                    id: req.params.user_id
                },
            });
            // console.log(getUpdatedUserInfo)

            res.status(201).json({
                message: `profile updated filename:${req.file.filename}`,
                data: getUpdatedUserInfo
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }
    }
}