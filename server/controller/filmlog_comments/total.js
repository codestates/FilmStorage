const { filmlog_comments, users } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { filmlog_id } = req.params;

      const commentsInfo = await filmlog_comments.findAll({
        where: {
          filmlog_id,
        },
        include: [{ model: users }],
        order: [
          ["createdAt", "ASC"],
          ["id", "ASC"],
        ],
      });

      if (!commentsInfo) {
        res.status(404).send({
          message: "Failed to load information",
        });
      } else {
        const organizedInfo = commentsInfo.map((info) => {
          const { contents, createdAt, id, user_id } = info;
          return {
            contents,
            createdAt,
            id,
            user_id,
            nickname: info.user.nickname,
          };
        });
        res.status(200).json({
          message: "ok",
          data: organizedInfo,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
