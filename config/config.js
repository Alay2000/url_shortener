const config = require('./config.json'); 
module.exports = {
  app_name: config.APP_NAME || 'App',

  env_mode: config.ENVIRONMENT,

  hostname: config.HOST || 'localhost',
  port: parseInt(config.PORT) || 4000,

  db_host: config.db.DB_HOST,
  db_port: config.db.DB_PORT,
  db_name: config.db.DB_NAME,
  db_user: config.db.DB_USER,
  db_pass: config.db.DB_PASS,
  db_dialect: config.db.DB_DIALECT,

  use_redis: config.USE_REDIS == 'true',
  
  redis_host: config.REDIS_HOST,
  redis_port: config.REDIS_PORT,
  redis_pass: config.REDIS_PASS,

}