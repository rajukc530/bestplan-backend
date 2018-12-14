import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import dietCtrl from '../controllers/diet.controller';
import { checkAuthHeader, canViewDietFiles } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(checkAuthHeader, dietCtrl.createTrainingPrograms)

    .get(checkAuthHeader, dietCtrl.findDietByName);

router
    .route('/makefolder')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(checkAuthHeader, dietCtrl.createTrainingPrograms);

router
    .route('/makesubfolder')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(checkAuthHeader, dietCtrl.createDietCategoryFolders);

router
    .route('/listfiles')
    .get(checkAuthHeader, canViewDietFiles, dietCtrl.listAllFilesInDirectory);

router
    .route('/listdietcategoryfolders')
    .get(checkAuthHeader, dietCtrl.listAllDietCategoryFolders);

router
    .route('/listfolder')
    .get(checkAuthHeader, dietCtrl.listAllFolders);

router
    .route('/uploadfile')
    .post(checkAuthHeader, dietCtrl.uploadFile);

router
    .route('/downloadfile')
    .post(checkAuthHeader, dietCtrl.downloadFile);

router
    .route('/deletefile')
    .post(checkAuthHeader, dietCtrl.deleteFile);

router
    .route('/createfolder')
    .post(checkAuthHeader, dietCtrl.createFolder);

router
    .route('/deletefolder')
    .post(checkAuthHeader, dietCtrl.deleteFolder);

router
    .route('/create')
    .post(checkAuthHeader, validate(paramValidation.diet), dietCtrl.createDiet);

router
    .route('/all')
    .get(checkAuthHeader, dietCtrl.findAllDiets);

router
    .route('/userdiets')
    .get(checkAuthHeader, dietCtrl.findAllDiets);
// TODO: enhance conversation with details when id is mentioned
export default router;
