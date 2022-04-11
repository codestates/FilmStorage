const { filmlogs } = require("../../models");

module.exports = {
  // 마이로그 조회 기능
  get: async (req, res) => {
    try {
      const { offset, limit, filmtype } = req.query;
      const { user_id } = req.params;
      // 마이로그 무한스크롤 시 제공하는 데이터
      let getMyLogData;
      if (offset && limit) {
        getMyLogData = await filmlogs.findAll({
          where: { user_id },
          offset: Number(offset),
          limit: Number(limit),
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
        });
      } else if (filmtype) {
        getMyLogData = await filmlogs.findAll({
          where: { user_id, filmtype },
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
        });
      }

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
        // 응답하는 데이터 개수가 요청받은 개수(limit) 보다 적으면 end 메시지 응답
        let message = "ok"
        if(limit) {
          message = getMyLogData.length < limit ? "end" : "ok";
        }
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
