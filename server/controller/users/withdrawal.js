const { users } = require('../../models');
const { verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    delete: async (req, res) => {
        //삭제할 유저 정보를 얻기 위해 토큰 해독
        const accessToken = req.cookies.accessToken;
        const decoded = verify(accessToken, process.env.ACCESS_SECRET);
        console.log(decoded)
        try {
            const userDelete = await users.destroy({
                where: {
                    email: decoded.email
                }
            })
            console.log(userDelete)
            res.status(204).send({ message: "Successfully withdrew" });
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Internal Server Error" });
        }

    }
}
