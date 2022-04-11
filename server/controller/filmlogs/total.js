const { filmlogs } = require("../../models");

module.exports = {
  //필름로그 전체 조회 기능
  get: async (req, res) => {
    try {
      const { offset, limit, filmtype } = req.query;

      let totalInfo;
      if (offset && limit) {
        totalInfo = await filmlogs.findAll({
          limit: Number(limit),
          offset: Number(offset),
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
        });
      } else if (filmtype) {
        totalInfo = await filmlogs.findAll({
          where: {
            filmtype,
          },
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
        });
      }

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

        let message = "ok";
        if (limit) {
          message = totalInfo.length < limit ? "end" : "ok";
        }

        res.status(200).json({
          message: message,
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
