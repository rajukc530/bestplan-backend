import repository from '../repositories/diet.repository';
import config from '../../config/config';

const mkdirp = require('mkdirp');
const fs = require('fs');
const dateFormat = require('dateformat');
const rimraf = require('rimraf');
const uuid = require('uuid');

const currentDir = config.dietDir;

async function createTrainingPrograms(req, res, next) {
    // High Carb
    const planDir1 = currentDir.concat('/diet/', 'High Carb/');
    await mkdirp.sync(planDir1, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir2 = currentDir.concat('/diet/', 'Low Carb/');
    await mkdirp.sync(planDir2, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir3 = currentDir.concat('/diet/', 'Vegetar/');
    await mkdirp.sync(planDir3, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir4 = currentDir.concat('/diet/', 'Low FodMap/');
    await mkdirp.sync(planDir4, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    return res.status(200).send(JSON.stringify('FOLDERS CREATED'));
}

async function createDietCategoryFolders(req, res) {
    const { name } = req.query;
    const planDir1 = currentDir.concat('/diet/', name, '/1200/');
    await mkdirp.sync(planDir1, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir2 = currentDir.concat('/diet/', name, '/1300/');
    await mkdirp.sync(planDir2, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir3 = currentDir.concat('/diet/', name, '/1400/');
    await mkdirp.sync(planDir3, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir4 = currentDir.concat('/diet/', name, '/1500/');
    await mkdirp.sync(planDir4, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    return res.status(200).send(JSON.stringify('FOLDERS CREATED'));
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
function listAllFolders(req, res) {
    const dir = currentDir.concat('/', 'diet');
    fs.readdir(dir, ((err, items) => {
        if (err) {
            return res.status(200).send(JSON.stringify(err));
        }
        return res.status(200).send(JSON.stringify(items));
    }));
}

function listAllDietCategoryFolders(req, res) {
    const { name } = req.query;
    const dir = currentDir.concat('/', 'diet/', name);
    fs.readdir(dir, ((err, items) => {
        if (err) {
            return res.status(200).send(JSON.stringify(err));
        }
        return res.status(200).send(JSON.stringify(items));
    }));
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function createFolder(req, res) {
    const route = req.body.route;
    const name = req.body.name;
    const category = req.body.category;
    const dir = currentDir.concat(route, '/', category, '/', name);
    await mkdirp.sync(dir, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    return res.status(200).send(JSON.stringify('FOLDERS CREATED'));
}

function getNearestCalorie(calorie) {
    const numCalorie = Number(calorie);
    let dirName;
    if (numCalorie % 50 >= 25) {
        dirName = Math.ceil(numCalorie / 50) * 50;
    } else {
        dirName = Math.floor(numCalorie / 50) * 50;
    }
    return String(dirName);
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function listAllFilesInDirectory(req, res, next) {
    const { route } = req.query;
    const { name } = req.query;
    const dirName = await getNearestCalorie(name);
    const { category } = req.query;
    const fileJson = [];
    const dir = currentDir.concat(route, '/', category, '/', dirName);

    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(200).send(JSON.stringify('UNABLE TO SCAN DIR'));
        }
        if (files.length > 0) {
            for (let file of files) {
                let fileSize;
                const fileName = file;
                const fileSizeInBytes = fs.statSync(dir.concat('/', file)).size;
                const fileSizeInKB = fileSizeInBytes / 1000;
                if (fileSizeInKB > 1000) {
                    fileSize = fileSizeInKB / 1000;
                    fileSize = Math.round(fileSize * 100) / 100
                    fileSize = String(fileSize).concat(' MB');
                } else {
                    fileSize = Math.round(fileSizeInKB * 100) / 100
                    fileSize = String(fileSizeInKB).concat(' KB');
                }
                const fileCreateDate = fs.statSync(dir.concat('/', file)).birthtime;
                const formattedDate = dateFormat(fileCreateDate, "mmmm dS, yyyy");
                fileJson.push({
                    name: fileName,
                    size: fileSize,
                    createDate: formattedDate
                });
            }
            return res.status(200).send(JSON.stringify(fileJson));
        }
        return res.status(200).send(JSON.stringify(fileJson));
    });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function uploadFile(req, res) {
    const route = req.body.route;
    const name = req.body.name;
    const category = req.body.category;
    // console.log('route ', route);
    // console.log('category ', category);
    // console.log('name ', name);
    const uploadDir = currentDir.concat(route, '/', category, '/', name);
    if (req.files) {
        let filePath = '';
        const file = req.files.upload;
        const fileName = file.name;
        return new Promise((resolve, reject) => {
            filePath = uploadDir.concat('/', fileName);
            file.mv(filePath, (err) => {
                if (err) {
                    reject(err);
                    return res.status(200).send(JSON.stringify(err));
                }
                resolve(filePath);
                return res.status(200).send(JSON.stringify('FILE UPLOADED'));
            });
        });
    }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function downloadFile(req, res) {
    const route = req.body.route;
    const category = req.body.category;
    const name = req.body.name;
    const folder = req.body.folder;
    const dirName = await getNearestCalorie(folder);
    // console.log('route ', route);
    // console.log('category ', category);
    // console.log('name ', name);
    // console.log('folder ', folder);

    const path = currentDir.concat(route, '/', category, '/', dirName, '/', name);
    res.download(path);
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteFile(req, res) {
    const route = req.body.route;
    const category = req.body.category;
    const name = req.body.name;
    const folder = req.body.folder;
    const dirName = await getNearestCalorie(folder);

    const path = currentDir.concat(route, '/', category, '/', dirName, '/', name);
    fs.unlink(path, (err) => {
        if (err) {
            return res.status(200).send(JSON.stringify(err));
        }
        return res.status(200).send(JSON.stringify('FILE DELETED'));
    });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function deleteFolder(req, res) {
    const route = req.body.route;
    const name = req.body.name;
    const category = req.body.category;

    const path = currentDir.concat(route, '/', category, '/', name);
    rimraf(path, (err) => {
        if (err) {
            return res.status(200).send(JSON.stringify(err));
        }
        return res.status(200).send(JSON.stringify('FOLDER DELETED'));
    });
}

function createDiet(req, res, next) {
    const dietName = req.body.name;
    const dietId = uuid.v4();
    const dietProtein = req.body.protein;
    const dietCarbs = req.body.carbs;
    const dietFat = req.body.fat;
    const dietJson = {
        id: dietId,
        name: dietName,
        protein: dietProtein,
        carbs: dietCarbs,
        fat: dietFat,
    };
    repository
        .create(dietJson)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findDietByName(req, res, next) {
    const { name } = req.query;
    repository
        .findDietByName(name)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findAllDiets(req, res, next) {
    repository
        .findAllDiets()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findAllDietsForUser(req, res, next) {
    const { user } = req.auth;
    repository
        .findAllDietsForUser(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findDietForUser(req, res, next) {
    const { user } = req.auth;
    repository
        .findDietForUser(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

export default {
    createTrainingPrograms,
    createDietCategoryFolders,
    listAllFilesInDirectory,
    uploadFile,
    downloadFile,
    deleteFile,
    listAllFolders,
    createFolder,
    deleteFolder,
    createDiet,
    findDietByName,
    findAllDiets,
    findAllDietsForUser,
    findDietForUser,
    listAllDietCategoryFolders,
};
