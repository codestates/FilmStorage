const { filmtalks, users } = require("../../models");

module.exports = {
  //필름토크 조회 수 증가 기능
  get: async (req, res) => {
    const { filmtalk_id } = req.params;

    try {
      const filmTalkData = await filmtalks.findOne({
        include: [{ model: users }],
        where: {
          id: filmtalk_id,
        },
      });

      if (!filmTalkData) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        await filmtalks.increment(
          { views: 1 },
          {
            where: {
              id: filmtalk_id,
            },
          }
        );

        const { id, user_id, category, title, image, contents, views, createdAt } =
          filmTalkData;

        const filmTalkDetailData = {
          id,
          user_id,
          category,
          title,
          image,
          contents,
          views,
          createdAt,
          nickname: filmTalkData.user.nickname,
        };

        res.status(200).json({
          message: "ok",
          data: filmTalkDetailData,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
