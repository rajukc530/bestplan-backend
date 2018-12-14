import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userWeightController from '../controllers/userWeight.controller';
import { checkAuthHeader } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    .post(
        checkAuthHeader,
        validate(paramValidation.userWeight),
        userWeightController.createUserWeight,
    )
    .get(checkAuthHeader, userWeightController.getUserWeight);

router
    .route('/recent')
    .get(checkAuthHeader, userWeightController.getUserRecentWeight);

// TODO: enhance conversation with details when id is mentioned
export default router;
