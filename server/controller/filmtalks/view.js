const { filmtalks } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { board_id } = req.params;

    try {
      const filmTalkData = await filmtalks.findOne({
        where: {
          id: board_id,
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
              id: board_id,
            },
          }
        );

        res.status(200).json({
          message: "ok",
          data: filmTalkData,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
}