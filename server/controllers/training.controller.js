import repository from '../repositories/training.repository';
import config from '../../config/config';

const mkdirp = require('mkdirp');
const fs = require('fs');
const dateFormat = require('dateformat');

const currentDir = config.trainingDir;

async function createTrainingPrograms(req, res, next) {
    const planDir1 = currentDir.concat('/training', '/1-3 Days/');
    await mkdirp.sync(planDir1, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir2 = currentDir.concat('/training', '/4 Days/');
    await mkdirp.sync(planDir2, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir3 = currentDir.concat('/training', '/5 Days/');
    await mkdirp.sync(planDir3, (err) => {
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
    });
    const planDir4 = currentDir.concat('/training', '/6 Days/');
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
 * @param {*} next
 */
function listAllFilesInDirectory(req, res, next) {
    const { route } = req.query;
    const { name } = req.query;
    const fileJson = [];
    // const basePath = process.cwd();
    const dir = currentDir.concat(route, '/', name);

    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(400).send(JSON.stringify('UNABLE TO SCAN DIR'));
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
    const uploadDir = currentDir.concat(route, '/', name);
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
function downloadFile(req, res, next) {
    const route = req.body.route;
    const category = req.body.category;
    const name = req.body.name;

    const path = currentDir.concat(route, '/', category, '/', name);
    res.download(path);
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function deleteFile(req, res, next) {
    const route = req.body.route;
    const category = req.body.category;
    const name = req.body.name;

    const path = currentDir.concat(route, '/', category, '/', name);
    fs.unlink(path, (err) => {
        if (err) {
            return res.status(200).send(JSON.stringify(err));
        }
        return res.status(200).send(JSON.stringify('FILE DELETED'));
    });
}

function findAllTrainingsForUser(req, res, next) {
    repository
        .findAllTrainingsForUser()
        .then(response => res.json(response))
        .catch(e => next(e));
}

export default {
    createTrainingPrograms,
    listAllFilesInDirectory,
    uploadFile,
    downloadFile,
    deleteFile,
    findAllTrainingsForUser,
};
