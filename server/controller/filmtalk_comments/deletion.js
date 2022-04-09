const { filmtalk_comments } = require("../../models");

module.exports = {
  // 필름토크 댓글 삭제 기능
  delete: async (req, res) => {
    try {
      const { filmtalk_comments_id } = req.params;

      const userInfo = await filmtalk_comments.findOne({
        where: {
          id: filmtalk_comments_id
        }
      })
      if (!userInfo) {
        res.status(404).send({ message: "Failed to load information" })
      } else {
        await filmtalk_comments.destroy({
          where: {
            id: filmtalk_comments_id,
          },
        });
        res.status(200).send({
          message: "Successfully deleted",
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
