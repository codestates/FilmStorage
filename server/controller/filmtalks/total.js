const { filmtalks, users } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { offset } = req.query;
    try {
      let talks;
      if (!offset) {
        talks = await filmtalks.findAll({
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
          include: [{ model: users }],
        });
      } else {
        talks = await filmtalks.findAll({
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
          offset: Number(offset),
          include: [{ model: users }],
        });
      }
      
      const filmTalkData = talks.map((data) => {
        const { id, category, createdAt, title, views } = data;
        return {
          id,
          category,
          createdAt,
          title,
          views,
          nickname: data.user.nickname,
        };
      });

      res.status(200).send({ message: "ok", data: filmTalkData });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
