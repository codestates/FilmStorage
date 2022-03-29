const { filmtalks } = require("../../models");

module.exports = {
  delete: async (req, res) => {
    const { filmtalk_id } = req.params
    const boardInfo = await filmtalks.findOne({
      where: {
        id: filmtalk_id
      }
    });
    if (!boardInfo) {
      res.status(404).send({ message: "Not Found" })
    } else {
      try {
        await filmtalks.destroy({
          where: {
            id: filmtalk_id
          }
        });
        res.status(200).send({
          message: "ok",
          data: {
            boardInfo
          }
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }
}