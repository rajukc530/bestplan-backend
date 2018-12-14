import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import trainingCtrl from '../controllers/training.controller';
import { checkAuthHeader, canViewTrainingFiles } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(checkAuthHeader, trainingCtrl.createTrainingPrograms);

router
    .route('/makefolder')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(checkAuthHeader, trainingCtrl.createTrainingPrograms);

router
    .route('/listfiles')
    .get(checkAuthHeader, canViewTrainingFiles, trainingCtrl.listAllFilesInDirectory);

router
    .route('/uploadfile')
    .post(checkAuthHeader, trainingCtrl.uploadFile);

router
    .route('/downloadfile')
    .post(checkAuthHeader, trainingCtrl.downloadFile);
router
    .route('/deletefile')
    .post(checkAuthHeader, trainingCtrl.deleteFile);

router
    .route('/usertrainings')
    .post(checkAuthHeader, trainingCtrl.findAllTrainingsForUser);

// TODO: enhance conversation with details when id is mentioned
export default router;
