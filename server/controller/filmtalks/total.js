const { filmtalks } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { offset, limit } = req.query;
    if (!offset || !limit) {
      res.status(404).send({ message: "Not Found" })
    } else {
      try {
        const talks = await filmtalks.findAll({
          order: [["createdAt", "DESC"],
          ["id", "DESC"]],
          offset: Number(offset),
          limit: Number(limit)
        },

        )
        res.status(200).send({ message: "ok", data: [talks] })
      }
      catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" })
      }
    }
  }
}