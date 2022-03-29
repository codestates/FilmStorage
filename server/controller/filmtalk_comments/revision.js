const { filmtalk_comments } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    try {
      const { user_id, filmtalk_id, filmtalk_comments_id } = req.params;
      const { contents } = req.body;

      await filmtalk_comments.update(
        {
          contents,
        },
        {
          where: {
            id: filmtalk_comments_id,
            user_id,
            filmtalk_id,
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
