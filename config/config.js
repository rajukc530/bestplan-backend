const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number().default(9099),
    JWT_SECRET: Joi.string()
        .required()
        .description('JWT Secret required to sign'),
    MYSQL_DB: Joi.string()
        .required()
        .description('Mysql database name'),
    MYSQL_PORT: Joi.number().default(3306),
    MYSQL_HOST: Joi.string().default('localhost'),
    MYSQL_DRIVER: Joi.string().default('mysql'),
    MYSQL_USER: Joi.string()
        .required()
        .description('Mysql username'),
    MYSQL_PASSWORD: Joi.string()
        .allow('')
        .description('Mysql password'),
    DIET_DIR: Joi.string()
        .allow('')
        .description('Mysql password'),
    TRAINING_DIR: Joi.string()
        .allow('')
        .description('Mysql password'),
    STRIPE_TEST_KEY: Joi.string()
        .allow('')
        .description('Mysql password'),
})
    .unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    trainingDir: envVars.TRAINING_DIR,
    dietDir: envVars.DIET_DIR,
    stripeTestKey: envVars.STRIPE_TEST_KEY,
    mysql: {
        db: envVars.MYSQL_DB,
        port: envVars.MYSQL_PORT,
        host: envVars.MYSQL_HOST,
        user: envVars.MYSQL_USER,
        password: envVars.MYSQL_PASSWORD,
        driver: envVars.MYSQL_DRIVER,
    },
    // re-done for sequelize cli
    database: {
        database: envVars.MYSQL_DB,
        port: envVars.MYSQL_PORT,
        host: envVars.MYSQL_HOST,
        username: envVars.MYSQL_USER,
        password: envVars.MYSQL_PASSWORD,
        dialect: 'mysql',
        driver: envVars.MYSQL_DRIVER,
    },
};

module.exports = config;
