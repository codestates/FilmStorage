const { filmlogs } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { filmlog_id } = req.params;

    try {
      const filmLogData = await filmlogs.findOne({
        where: {
          id: filmlog_id,
        },
      });

      if (!filmLogData) {
        res.status(404).send({
          message: "Failed to load information",
        });
      } else {
        await filmlogs.increment(
          { views: 1 },
          {
            where: {
              id: filmlog_id,
            },
          }
        );

        res.status(200).json({
          message: "ok",
          data: filmLogData,
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
