const { filmlogs } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { offset, limit } = req.query;
      const { user_id } = req.params;

      const getMyLogData = await filmlogs.findAll({
        where: { user_id },
        offset: Number(offset),
        limit: Number(limit),
        order: [
          ["createdAt", "DESC"],
          ["id", "DESC"],
        ],
      });

      if (!getMyLogData) {
        res.status(404).send({
          message: "Failed to load information",
        });
      } else {
        const myLogData = getMyLogData.map((log) => {
          const { id, user_id, photo, filmtype } = log;
          return {
            id,
            user_id,
            photo,
            filmtype,
          };
        });

        const message = getMyLogData.length < limit ? "end" : "ok";

        res.status(200).json({
          message: message,
          data: myLogData,
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
