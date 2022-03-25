require("dotenv").config();
const { users } = require("../../models");

module.exports = {
    patch: async (req, res) => {
        res.send("hello world");
    },

    profile: async (req, res) => {

        // console.log(req.file);
        try {
            await users.update(
                {
                    profile: `${process.env.DOMAIN}/users/profiles/${req.file.filename}`,
                },
                {
                    where: {
                        id: req.params.user_id,
                    },
                }
            );
            const getUpdatedUserInfo = await users.findOne({
                where: {
                    id: req.params.user_id,
                },
            });

            res.status(201).json({
                message: "Profile has been updated",
                data: getUpdatedUserInfo.dataValues,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Internal Server Error",
            });
        }
    },
}