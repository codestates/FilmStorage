const axios = require('axios');

module.exports = {
    get: async (req, res) => {
        const weather = await axios.get()
        red.send({ data: weather })
    },

}