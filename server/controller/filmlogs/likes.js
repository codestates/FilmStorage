const { likes, filmlogs } = require("../../models");

module.exports = {
  //필름로그 좋아요 등록 기능
  post: async (req, res) => {
    const { user_id, filmlog_id } = req.params;
    try {
      const [likeData, created] = await likes.findOrCreate({
        where: {
          user_id,
          filmlog_id,
        },
      });
      if (created) {
        await filmlogs.increment(
          { likesCount: 1 },
          {
            where: {
              id: filmlog_id,
            },
          }
        );
      }
      if (!created) {
        if (likeData.dataValues.like === true) {
          await likes.update(
            { like: false },
            {
              where: {
                user_id,
                filmlog_id,
              },
            }
          );
          await filmlogs.increment(
            { likesCount: -1 },
            {
              where: {
                id: filmlog_id,
              },
            }
          );
        } else {
          // like === 0
          await likes.update(
            { like: true },
            {
              where: {
                user_id,
                filmlog_id,
              },
            }
          );
          await filmlogs.increment(
            { likesCount: 1 },
            {
              where: {
                id: filmlog_id,
              },
            }
          );
        }
      }
      const getLikeData = await likes.findOne({
        where: {
          user_id,
          filmlog_id,
        },
      });
      res.status(200).json({
        message: "ok",
        data: getLikeData.dataValues,
      });
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      console.log(err);
    }
  },

  //해당 게시글 조회 시 좋아요 개수 가져오는 기능
  get: async (req, res) => {
    try {
      const { user_id, filmlog_id } = req.params;
      const getLikesData = await likes.findOne({
        attributes: ["like"],
        where: {
          user_id,
          filmlog_id,
        },
      });

      const getLikesCountData = await filmlogs.findOne({
        attributes: ["likesCount"],
        where: {
          id: filmlog_id,
        },
      });

      res.status(200).send({
        message: "ok",
        data: {
          like: getLikesData.like,
          likesCount: getLikesCountData.likesCount,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
