require("dotenv").config();
const { filmtalks } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    res.send("hello world");
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

    const { user_id, filmtalk_id } = req.params;

    try {
      await filmtalks.update(
        {
          profile: makeURL(fileNames),
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

      res.status(200).json({
        message: "Images has been updated",
        data: getUpdatedInfo.dataValues,
        images: getUpdatedInfo.dataValues.profile.split("&"),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
