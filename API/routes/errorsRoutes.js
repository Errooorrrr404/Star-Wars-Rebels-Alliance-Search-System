const status = require('http-status');

require('dotenv').config();


function errorsRoutes() {

  return [
    {
      method: '*',
      path: '/{any*}',
      handler: function (request, h) {
        return h.response({ message: 'page-not-found' }).code(status.NOT_FOUND);
      }
    },
  ];

}


module.exports = errorsRoutes;
