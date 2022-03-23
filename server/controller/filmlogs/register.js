const { galleries } = require('../../models')

module.exports = {
    post: async (req, res) => {
        const { photo, filmtype, contents } = req.body;
        if (!photo || !filmtype || !contents) {
            res.send({ message: "Bad Request" })
        } else {

            res.send('hello world')
        }
    }
}