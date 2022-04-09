const { filmlogs } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  //좋아요 수가 가장 높은 필름로그 데이터 3개를 조회하는 기능
  topthree: async (req, res) => {
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

      const topOne = await filmlogs.max("likesCount", {
        where: {
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });
      const topTwo = await filmlogs.max("likesCount", {
        where: {
          likesCount: {
            [Op.lt]: topOne,
          },
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });
      const topthree = await filmlogs.max("likesCount", {
        where: {
          likesCount: {
            [Op.lte]: topTwo,
          },
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const getTopThreeData = await filmlogs.findAll({
        limit: 3,
        where: {
          likesCount: {
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
          id,
          user_id,
          photo,
          filmtype,
        };
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

  bestfilm: async (req, res) => {
    //필름로그에 가장 많이 등록된 필름을 조회하는 기능
    try {
      const getFilmType = await filmlogs.findAll({
        attributes: ["filmtype"],
      });
      const filmtypes = getFilmType.map((item) => item.filmtype);
      const filmList = [...new Set(filmtypes)];

      let countPerEachFilm = [];

      for (let i = 0; i < filmList.length; i++) {
        const { count } = await filmlogs.findAndCountAll({
          where: {
            filmtype: filmList[i],
          },
        });
        let obj = {
          filmtype: filmList[i],
          count: count,
        };
        countPerEachFilm.push(obj);
      }

      const bestFilm = countPerEachFilm.reduce((acc, cur) =>
        acc.count > cur.count ? acc : cur
      );

      res.status(200).json({
        message: "ok",
        bestFilm,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
