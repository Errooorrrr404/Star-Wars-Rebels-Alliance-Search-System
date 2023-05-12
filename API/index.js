'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Qs = require('qs');

const api = require('./package.json');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const { jwtOptions } = require('./tools/utils');
const typeRoutes = require('./routes/typeRoutes');
const errorsRoutes = require('./routes/errorsRoutes');

require('dotenv').config();


const start = async () => {
    try {
        console.log('Démarrage du serveur Hapi');

        const server = Hapi.server({
            port: process.env.PORT || 8080,
            host: process.env.HOST || 'localhost',
            query: {
                parser: (query) => Qs.parse(query)
            },
            "routes": {
                "cors": {
                    origin: ['*'] // an array of origins or 'ignore'

                }
            }
        });

        await server.register(Jwt);

        server.auth.strategy('my_jwt_strategy', 'jwt', {
            keys: process.env.JWT_SECRET,
            verify: {
                aud: jwtOptions.aud,
                iss: jwtOptions.iss,
                sub: jwtOptions.sub,
                nbf: jwtOptions.nbf,
                exp: jwtOptions.exp,
            },
            validate: (artifacts, request, h) => {
                if (artifacts.decoded.payload.version !== api.version) {
                    return { isValid: false };
                }
                const user = artifacts.decoded.payload;
                return {
                    isValid: true,
                    credentials: {
                        user: {
                            username: user.username,
                            userId: user.userId
                        },
                    }
                };
            }
        });
        server.auth.default('my_jwt_strategy');

        server.route(await searchRoutes());
        server.route(await typeRoutes());
        server.route(await authRoutes());
        server.route(errorsRoutes());

        await server.start();
        console.log('Serveur Hapi démarré');
        console.log(`Disponible sur ${server.info.uri}`);
    } catch (err) {
        console.error('Erreur lors du démarrage du serveur Hapi', err);
        process.exit(1);
    }
};

start();