const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
let config;

switch (env) {
  case 'production':
    config = require('./prod');
    break;
  case 'local:mock':
  case 'local-mock':
    config = require('./local.mock');
    break;
  case 'development':
  default:
    config = require('./dev');
}

module.exports = config;
