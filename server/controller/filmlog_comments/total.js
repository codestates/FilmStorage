const { filmlog_comments } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { filmlog_id } = req.params;

      const commentsInfo = await filmlog_comments.findAll({
        where: {
          filmlog_id,
        },
        order: [
          ["createdAt", "DESC"],
          ["id", "DESC"],
        ],
      });

      if (!commentsInfo) {
        res.status(404).send({
          message: "Failed to load information",
        });
      }
      res.status(200).json({
        message: "ok",
        data: commentsInfo,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
