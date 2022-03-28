const { filmlogs } = require("../../models");

// user_id / filmtype / contents /

module.exports = {
  post: async (req, res) => {
    const { user_id } = req.params;
    try {
      const { filmtype, contents } = req.body;

      await filmlogs.create({
        user_id,
        filmtype,
        contents,
      });

      res.status(201).send({
        message: "Successfully Registered",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
