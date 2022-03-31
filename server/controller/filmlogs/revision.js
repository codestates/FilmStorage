require("dotenv").config();
const { filmlogs } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    const { user_id, filmlog_id } = req.params;

    try {
      const { filmtype, contents } = req.body;

      await filmlogs.update(
        {
          filmtype,
          contents,
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
  photo: async (req, res) => {
    const { user_id, filmlog_id } = req.params;
    console.log(req.file);
    try {
      await filmlogs.update(
        {
          photo: `https://localhost:4000/filmlogs/photos/${req.file.filename}`,
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
