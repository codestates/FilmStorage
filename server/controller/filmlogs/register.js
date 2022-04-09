const { filmlogs } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  // 필름로그 등록 기능
  post: async (req, res) => {
    const { user_id } = req.params;
    try {
      const { filmtype, contents, location, lat, log } = req.body;

      const createdData = await filmlogs.create({
        user_id,
        filmtype,
        contents,
        location,
        lat,
        log,
      });

      res.status(201).json({
        data: createdData,
        message: "Successfully Registered",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  maps: async (req, res) => {
    //필름스팟 접속 시 필름로그에 등록된 장소 조회 기능
    try {
      const mapInfo = await filmlogs.findAll({
        where: {
          lat: {
            [Op.not]: null,
          },
          log: {
            [Op.not]: null,
          },
        },
      });
      res.status(200).send({ data: mapInfo, message: "성공적인 응답입니다." });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "잘못된 요청입니다." });
    }
  },
};
