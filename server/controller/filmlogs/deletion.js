const { filmlogs } = require("../../models");

module.exports = {
  //필름로그 삭제 기능
  delete: async (req, res) => {
    const { filmlog_id } = req.params;
    try {
      await filmlogs.destroy({
        where: {
          id: filmlog_id,
        },
      });

      res.status(200).send({
        message: "Successfully Deleted",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
