const { filmtalk_comments, users } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { filmtalk_id } = req.params;

      const commentsInfo = await filmtalk_comments.findAll({
        where: {
          filmtalk_id,
        },
        include: [{ model: users }],
        order: [
          ["createdAt", "DESC"],
          ["id", "DESC"],
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
