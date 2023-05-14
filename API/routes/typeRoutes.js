const status = require('http-status');
const Joi = require('joi');

const { formateResponse } = require('../tools/utils');
const { getSchemaSWApi } = require('../tools/schema');
const { default: axios } = require('axios');

require('dotenv').config();


async function typeRoutes() {

  const schema = await getSchemaSWApi();

  return [
    {
      method: 'GET',
      path: '/',
      options: {
        auth: 'my_jwt_strategy',
      },
      handler: async function (request, h) {
        return h.response({ schema: schema }).code(status.OK);
      }
    },
    {
      method: 'GET',
      path: '/{type}/{id?}',
      options: {
        auth: 'my_jwt_strategy',
        validate: {
          params: Joi.object({
            type: Joi.string().valid(...schema).required(),
            id: Joi.number().integer().min(1).optional().default(''),
          }),
          query: Joi.object({
            format: Joi.string().valid('json', 'wookiee').optional().default('json'),
            page: Joi.number().integer().min(1).optional().default(1),
          })
        },
      },
      handler: async function (request, h) {
        try {
          const { type, id } = request.params;
          const { format, page } = request.query;

          const url = `${process.env.BASE_URL}/${type}/${id}?format=${format}&page=${page}`;
          const response = await axios.get(url);

          return h.response(formateResponse(response.data, format)).code(status.OK);
        } catch (err) {
          return h.response({ message: err.response.data.detail || err.message }).code(err.response.status || status.BAD_REQUEST);
        }
      }
    },
  ];

}


module.exports = typeRoutes;
