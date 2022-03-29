const { filmtalks } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { user_id } = req.params;
    try {
      const { category, title, contents } = req.body;
      await filmtalks.create({
        user_id,
        category,
        title,
        contents
      });
      res.status(201).send({ message: "Successfully registered" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }

  }
}