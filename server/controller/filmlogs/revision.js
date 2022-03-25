require("dotenv").config();
const { filmlogs } = require("../../models");

module.exports = {
    patch: async (req, res) => {
        res.send("hello world");
    },
    photo: async (req, res) => {
        const { user_id, filmlog_id } = req.params;

        try {
            await filmlogs.update(
                {
                    photo: `${process.env.DOMAIN}/filmlogs/photos/${req.file.filename}`,
                },
                {
                    where: {
                        id: filmlog_id,
                        user_id: user_id,
                    },
                }
            );

            const getUpdatedFilmLogInfo = await filmlogs.findOne({
                where: {
                    id: filmlog_id,
                    user_id: user_id,
                },
            });

            res.status(200).json({
                message: "Photo has been updated",
                data: getUpdatedFilmLogInfo.dataValues,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Internal Server Error",
            });
        }
    },
};
