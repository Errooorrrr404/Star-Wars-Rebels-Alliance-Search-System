const api = require('../package.json');

require('dotenv').config();

function formateResponse(obj) {
    const regex = /https:\/\/swapi\.dev\/api\//g;
    const replacement = `http://${process.env.HOST}:${process.env.PORT}/`;

    return JSON.parse(JSON.stringify(obj).replace(regex, replacement).replaceAll('/?', '?').replaceAll('/"', '"'));
}

const jwtOptions = {
    iss: process.env.JWT_ISSUER,
    aud: process.env.JWT_AUDIENCE,
    version: api.version,
    sub: false,
    nbf: true,
    exp: true,
    algorithm: 'HS256',
    expiresIn: '1h'
};


module.exports = {
    formateResponse,
    jwtOptions
};