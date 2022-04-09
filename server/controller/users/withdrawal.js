const { users } = require('../../models');
const { verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  //회원탈퇴 기능
  delete: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const decoded = verify(accessToken, process.env.ACCESS_SECRET);
    console.log(decoded)
    try {
      await users.destroy({
        where: {
          email: decoded.email
        }
      })
      res.status(204).send({ message: "Successfully withdrew" });
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
}
