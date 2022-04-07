const { likes, filmlogs } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { user_id, filmlog_id } = req.params;
    // res.send('hello world')
    try {
      const [likeData, created] = await likes.findOrCreate({
        where: {
          user_id,
          filmlog_id,
        },
      });
      //like : true 생성
      // 한 번 다시 클릭 created가 있으니까 취소 됨
      // 다시 클릭하면(like : false) 조건에 맞지 않으니 새로운 레코드 생성(like : true)
      //초기 like 값 1
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
