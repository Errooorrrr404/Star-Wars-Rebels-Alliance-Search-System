const status = require('http-status');
const Joi = require('joi');

const { formateResponse } = require('../tools/utils');
const { getSchemaSWApi } = require('../tools/schema');
const { default: axios } = require('axios');

require('dotenv').config();


async function searchRoutes() {

    const schema = await getSchemaSWApi();

    return [
        {
            method: 'GET',
            path: '/{type}/search',
            options: {
                auth: 'my_jwt_strategy',
                validate: {
                    params: Joi.object({
                        type: Joi.string().valid(...schema).required()
                    }),
                    query: Joi.object({
                        q: Joi.string().trim().min(1).required(),
                        page: Joi.number().integer().min(1).optional().default(1),
                        format: Joi.string().valid('json', 'wookiee').optional().default('json')
                    })
                },
            },
            handler: async function (request, h) {
                try {
                    const { type } = request.params;
                    const { q, page, format } = request.query;
                    const url = `${process.env.BASE_URL}/${type}?search=${q}&page=${page}&format=${format}`;
                    const response = await axios.get(url);

                    return h.response(formateResponse(response.data, format)).code(status.OK);
                } catch (err) {
                    return h.response({ message: err.message }).code(status.BAD_REQUEST);
                }
            }
        },
    ];

}


module.exports = searchRoutes;
