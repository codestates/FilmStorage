const { filmlog_comments } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    try {
      const { user_id, filmlog_id, filmlog_comments_id } = req.params;
      const { contents } = req.body;

      await filmlog_comments.update(
        {
          contents,
        },
        {
          where: {
            id: filmlog_comments_id,
            user_id,
            filmlog_id,
          },
        }
      );

      res.status(200).send({
        message: "Successfully modified",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
