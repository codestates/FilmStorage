const { filmtalk_comments } = require("../../models");

module.exports = {
  delete: async (req, res) => {
    try {
      const { user_id, filmtalk_id, filmtalk_comments_id } = req.params;

      await filmtalk_comments.destroy({
        where: {
          id: filmtalk_comments_id,
          user_id,
          filmtalk_id,
        },
      });

      res.status(200).send({
        message: "Successfully deleted",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
