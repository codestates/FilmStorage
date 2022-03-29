const { filmlogs } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const { user_id } = req.params;

      const getMyLogData = await filmlogs.findAll({
        where: { user_id },
      });

      if (!getMyLogData) {
        res.status(404).send({
          message: "Failed to load information",
        });
      } else {
        const myLogData = getMyLogData.map((log) => {
          const { id, user_id, photo, filmtype } = log;
          return {
            id, user_id, photo, filmtype
          }
        });

        res.status(200).json({
          message: "ok",
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
