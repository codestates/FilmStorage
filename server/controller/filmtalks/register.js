require("dotenv").config();
const { filmtalks } = require("../../models");

module.exports = {
  // 필름토크 등록 기능
  post: async (req, res) => {
    const { user_id } = req.params;
    try {
      const { category, title, contents } = req.body;
      const createdData = await filmtalks.create({
        user_id,
        category,
        title,
        contents,
      });
      res.status(201).send({
        data: createdData,
        message: "Successfully registered",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //이미지 등록 기능
  imageURL: async (req, res) => {
    try {
      const imgURL = `${process.env.SERVER_DOMAIN}/filmtalks/${req.file.path}`;
      res.status(200).send({
        message: "URL Successfully Created",
        url: imgURL,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
