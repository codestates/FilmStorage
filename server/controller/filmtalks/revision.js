require("dotenv").config();
const { filmtalks } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    const { user_id, filmtalk_id } = req.params;
    const { category, title, contents } = req.body;
    try {
      await filmtalks.update({
        category,
        title,
        contents
      }, {
        where: {
          user_id,
          filmtalk_id
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: "Internal Server Error" })
    }
  },

  images: async (req, res) => {
    console.log(req.files);
    const fileNames = req.files.map((file) => file.filename);

    const makeURL = (fileNames) => {
      let profileURLs = `${process.env.DOMAIN}/filmtalks/images/${fileNames[0]}`;
      for (let i = 1; i < fileNames.length; i++) {
        profileURLs += `&${process.env.DOMAIN}/filmtalks/images/${fileNames[i]}`;
      }
      return profileURLs;
    };
    console.log('??????####', makeURL(fileNames))

    const { user_id, filmtalk_id } = req.params;

    try {
      await filmtalks.update(
        {
          image: makeURL(fileNames),
        },
        {
          where: {
            id: filmtalk_id,
            user_id: user_id,
          },
        }
      );
      const getUpdatedInfo = await filmtalks.findOne({
        where: {
          id: filmtalk_id,
          user_id: user_id,
        },
      });
      console.log('??????', getUpdatedInfo.dataValues)
      res.status(200).json({
        message: "Successfully modified",
        data: getUpdatedInfo.dataValues,
        images: getUpdatedInfo.dataValues.image.split("&"),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};