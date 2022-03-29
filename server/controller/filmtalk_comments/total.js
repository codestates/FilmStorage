const { filmtalk_comments } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { filmtalk_id } = req.params;

      const commentsInfo = await filmtalk_comments.findAll({
        where: {
          filmtalk_id,
        },
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
