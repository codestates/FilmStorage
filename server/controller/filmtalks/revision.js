require("dotenv").config();
const { filmtalks } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    const { user_id, filmtalk_id } = req.params;
    const { category, title, contents } = req.body;
    try {
      await filmtalks.update({
        category,
        title,
        contents
      }, {
        where: {
          user_id,
          filmtalk_id
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: "Internal Server Error" })
    }
  },
};