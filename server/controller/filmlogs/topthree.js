const { filmlogs } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  get: async (req, res) => {
    try {
      const today = new Date();
      const startDay = today.getDate() - today.getDay() + 1;
      const endDay = startDay + 6;
      const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        startDay
      );
      const endOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        endDay,
        23,
        59,
        59
      );

      const topOne = await filmlogs.max("views", {
        where: {
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });
      const topTwo = await filmlogs.max("views", {
        where: {
          views: {
            [Op.lt]: topOne,
          },
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });
      const topthree = await filmlogs.max("views", {
        where: {
          views: {
            [Op.lt]: topTwo,
          },
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const getTopThreeData = await filmlogs.findAll({
        where: {
          views: {
            [Op.or]: [topOne, topTwo, topthree],
          },
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const topThreeData = getTopThreeData.map((data) => {
        const { id, user_id, photo, filmtype } = data;
				return {
					id, user_id, photo, filmtype
				}
      });

      res.status(200).json({
        data: topThreeData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
