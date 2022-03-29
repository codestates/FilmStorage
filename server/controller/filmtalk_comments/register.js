const { filmtalk_comments } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { user_id, filmtalk_id } = req.params;
      const { contents } = req.body;

      await filmtalk_comments.create({
        user_id,
        filmtalk_id,
        contents,
      });

      res.status(201).send({
        message: "Successfully registered",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
