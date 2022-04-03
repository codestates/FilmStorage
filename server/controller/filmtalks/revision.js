require("dotenv").config();
const { filmtalks } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    const { filmtalk_id } = req.params;
    const { category, title, contents } = req.body;
    try {
      await filmtalks.update(
        {
          category,
          title,
          contents,
        },
        {
          where: {
            id: filmtalk_id,
          },
        }
      );

      const filmTalkData = await filmtalks.findOne({
        where: {
          id: filmtalk_id,
        },
      });

      const { id } = filmTalkData;

      res.status(200).send({
        id,
        message: "Successfully modified",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
