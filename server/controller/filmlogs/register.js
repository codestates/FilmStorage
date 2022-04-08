const { filmlogs } = require("../../models");
const { Op } = require("sequelize");

// user_id / filmtype / contents /

module.exports = {
  post: async (req, res) => {
    const { user_id } = req.params;
    try {
      //장소명,위도,경도 정보 받아오기
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
    //요청이 들어오면 바로 위도,경도 정보 리턴
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
