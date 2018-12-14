import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import config from './config';

const db = {};

// connect to mysql db
const sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.password,
    {
        dialect: 'mysql',
        port: config.mysql.port,
        host: config.mysql.host,
        driver: config.mysql.driver,
    },
);

const modelsDir = path.normalize(`${__dirname}/../server/models`);

// loop through all files in models directory ignoring hidden files and this file
fs
    .readdirSync(modelsDir)
    .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
    // import model files and save model names
    .forEach((file) => {
        console.info(`Loading model file ${file}`);
        const model = sequelize.import(path.join(modelsDir, file));
        db[model.name] = model;
    });

// calling all the associate function, in order to make the association between the models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend(
    {
        sequelize,
        Sequelize,
    },
    db,
);
