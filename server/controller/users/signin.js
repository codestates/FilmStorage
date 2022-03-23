const { users } = require("../../models")

module.exports = {
    post: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            res.send({ message: "Invalid email or password" })
        } else {
            try {
                const userData = await users.findOne({
                    where: { email }
                })

                if (!userData) {
                    res.send({ message: "No matching user information" })
                } else {
                    const { id, email, password, nickname, profile, mobile, createdAt, updatedAt } = userData.dataValues
                    res.send({
                        data: {
                            id, email, password, nickname, profile, mobile, createdAt, updatedAt
                        }, message: "Successfully Logged In"
                    })
                }

            } catch (err) {
                console.log(err)
            }
        }
    }
}