const axios = require('axios');

require('dotenv').config();

async function getSchemaSWApi() {
    try {
        const url = `${process.env.BASE_URL}`;
        const response = await axios.get(url);

        return Object.keys(response.data);
    } catch {
        return null;
    }
}


module.exports = {
    getSchemaSWApi
};