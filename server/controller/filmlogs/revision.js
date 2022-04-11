require("dotenv").config();
const { filmlogs } = require("../../models");

module.exports = {
  //필름로그 수정 기능
  patch: async (req, res) => {
    const { user_id, filmlog_id } = req.params;

    try {
      const { filmtype, contents, location, lat, log } = req.body;

      await filmlogs.update(
        {
          filmtype,
          contents,
          location,
          lat,
          log,
        },
        {
          where: {
            id: filmlog_id,
            user_id,
          },
        }
      );

      res.status(200).send({
        message: "Successfully Modified",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
  // 필름로그 사진 등록 기능
  photo: async (req, res) => {
    const { user_id, filmlog_id } = req.params;
    console.log(req.file);
    try {
      await filmlogs.update(
        {
          photo: `${process.env.SERVER_DOMAIN}/filmlogs/photos/${req.file.filename}`,
        },
        {
          where: {
            id: filmlog_id,
            user_id: user_id,
          },
        }
      );

      const getUpdatedFilmLogInfo = await filmlogs.findOne({
        where: {
          id: filmlog_id,
          user_id: user_id,
        },
      });

      res.status(200).json({
        message: "Photo has been updated",
        data: getUpdatedFilmLogInfo.dataValues.photo,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
