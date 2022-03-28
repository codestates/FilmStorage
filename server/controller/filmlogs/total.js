const { filmlogs } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const totalInfo = await filmlogs.findAll();

      if (!totalInfo) {
        res.status(404).send({
          message: "Failed to load information",
        });
      } else {
        const filteredInfo = totalInfo.map((data) => {
          const { id, user_id, photo, filmtype } = data;
          return {
            id,
            user_id,
            photo,
            filmtype,
          };
        });

        res.status(200).json({
          message: "ok",
          data: filteredInfo,
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
