const api = require('../package.json');

require('dotenv').config();

const wookieeKeys = {
    "whrascwo": "name",
    "scoowawoan": "model",
    "scrawhhuwwraoaaohurcworc": "manufacturer",
    "oaoocao_ahwh_oarcwowaahaoc": "cost_in_credits",
    "anwowhrraoac": "length",
    "scrak_raaoscoocakacworcahwhrr_cakwowowa": "max_atmosphering_speed",
    "oarcwooh": "crew",
    "akraccwowhrrworcc": "passengers",
    "oararcrroo_oaraakraoaahaoro": "cargo_capacity",
    "oaoowhchuscrarhanwoc": "consumables",
    "howoacahoaanwo_oaanracc": "vehicle_class",
    "akahanooaoc": "pilots",
    "wwahanscc": "films",
    "oarcworaaowowa": "created",
    "wowaahaowowa": "edited",
    "hurcan": "url",
    "acwoahrracao": "height",
    "scracc": "mass",
    "acraahrc_oaooanoorc": "hair_color",
    "corahwh_oaooanoorc": "skin_color",
    "worowo_oaooanoorc": "eye_color",
    "rhahrcaoac_roworarc": "birth_year",
    "rrwowhwaworc": "gender",
    "acooscwoohoorcanwa": "homeworld",
    "cakwooaahwoc": "species",
    "howoacahoaanwoc": "vehicles",
    "caorarccacahakc": "starships",
    "rcooaoraaoahoowh_akworcahoowa": "rotation_period",
    "oorcrhahaoraan_akworcahoowa": "orbital_period",
    "waahrascwoaoworc": "diameter",
    "oaanahscraaowo": "climate",
    "rrrcrahoahaoro": "gravity",
    "aoworcrcraahwh": "terrain",
    "churcwwraoawo_ohraaoworc": "surface_water",
    "akooakhuanraaoahoowh": "population",
    "rcwocahwawowhaoc": "residents",
    "oaanraccahwwahoaraaoahoowh": "classification",
    "wawocahrrwhraaoahoowh": "designation",
    "rahoworcrarrwo_acwoahrracao": "average_height",
    "rahoworcrarrwo_anahwwwocakrawh": "average_lifespan",
    "anrawhrrhurarrwo": "language",
    "akwoooakanwo": "people",
    "corahwh_oaooanoorcc": "skin_colors",
    "acraahrc_oaooanoorcc": "hair_colors",
    "worowo_oaooanoorcc": "eye_colors",
    "acroakworcwarcahhowo_rcraaoahwhrr": "hyperdrive_rating",
    "MGLT": "MGLT",
    "caorarccacahak_oaanracc": "starship_class"
}






function replaceWookiesKeysToJSON(obj) {
    let copy = obj;
    const keys = Object.keys(wookieeKeys);
    keys.forEach(key => {
        copy[wookieeKeys[key]] = copy[key];
        delete copy[key];
    });
    return copy;
}

const arrayKeys = [
    "pilots",
    "films",
    "vehicles",
    "starships",
    "residents",
    "people"
]

function formateResponse(obj, format) {
    let copy = obj;
    // if (format === 'wookiee') {
    //     copy = replaceWookiesKeysToJSON(obj)
    // }
    const regexJSON = /https:\/\/swapi\.dev\/api\//g;
    const regexWookiee = /acaoaoakc:\/\/cohraakah\.wawoho\/raakah\//g;
    const replacement = `http://${process.env.HOST}:${process.env.PORT}/`;

    let parsed = JSON.parse(
        JSON
        .stringify(copy)
        .replace(regexJSON, replacement)
        .replace(regexWookiee, replacement)
        .replaceAll('/?', '?')
        .replaceAll('/"', `"`)
    );

    for (let i = 0; i < arrayKeys.length; i++) {
        if (parsed[arrayKeys[i]]) {
            parsed[arrayKeys[i]] = parsed[arrayKeys[i]].map(url => {
                Object.keys(wookieeKeys).forEach(key => {
                    url = url.replace(key, wookieeKeys[key]);
                });

                return url
            });
        }
    }

    if (parsed?.url) {
        Object.keys(wookieeKeys).forEach(key => {
            parsed.url = parsed.url.replace(key, wookieeKeys[key]);
        });
    }

    return parsed;
}

const jwtOptions = {
    iss: process.env.JWT_ISSUER,
    aud: process.env.JWT_AUDIENCE,
    version: api.version,
    sub: false,
    nbf: true,
    exp: true,
    algorithm: 'HS256',
    expiresIn: '1h',
    ttlSec: 14400, // 4 hours
};


module.exports = {
    formateResponse,
    jwtOptions
};