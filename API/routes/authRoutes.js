const Bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const status = require('http-status');
const Joi = require('joi');

const users = require('../data/users');
const api = require('../package.json');
const { jwtOptions } = require('../tools/utils');

require('dotenv').config();


async function authRoutes() {

  return [
    {
      method: 'POST',
      path: '/signin',
      options: {
        validate: {
          payload: Joi.object({
            login: Joi.string().required(),
            password: Joi.string().required()
          }).required()
        },
        auth: false
      },
      handler: function (request, h) {
        try {
          const { login, password } = request.payload;
          const user = users.find((u) => u.username.toLowerCase() === login.toLowerCase());

          if (!user) {
            throw new Error('bad-credentials');
          }

          const isValid = Bcrypt.compareSync(password, user.password);
          if (!isValid) {
            throw new Error('bad-credentials');
          }
          return h.response(
            {
              token: Jwt.token.generate(
                {
                  username: login.toLowerCase(),
                  userId: user.id,
                  version: api.version,
                  aud: jwtOptions.aud,
                  iss: jwtOptions.iss,
                },
                process.env.JWT_SECRET,
                jwtOptions,
              )
            },
          ).code(status.OK);
        }
        catch (err) {
          return h.response({ message: err.message }).code(status.UNAUTHORIZED);
        }
      }
    },
  ];

}


module.exports = authRoutes;
