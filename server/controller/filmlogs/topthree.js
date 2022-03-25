const { filmlogs } = require('../../models')
const { Op } = require('sequelize');

module.exports = {
    get: async (req, res) => {
        try {
            const today = new Date();
            const startDay = today.getDate() - today.getDay() + 1;
            const startOfWeek = new Date(
                today.getFullYear(),
                today.getMonth(),
                startDay
            );
            // const endOfWeek = new Date(
            //     today.getFullYear(),
            //     today.getMonth(),
            //     endDay,
            //     23,
            //     59,
            //     59
            // )
            const endOfWeek = new Date(
                2022, 02, 25, 14, 33
            )
            console.log(startOfWeek.toLocaleString(), endOfWeek.toLocaleString())
            //날짜를 업데이트 하기
            // const startDay  = today.getDate() - today.getDay() + 1;
            // const endDay = startDay + 6;
            // const startOfWeek = new Date(
            //     today.getFullYear(),
            //     today.getMonth(),
            //     startDay
            // );
            // const endOfWeek = new Date(
            //     today.getFullYear()
            // )
            const filmlogData = await filmlogs.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startOfWeek, endOfWeek]
                    },
                },
            })
            res.status(200).json({
                data: getWeeklyTopThree,
            })
        } catch (err) {
            console.log(err)
        }
    }
}