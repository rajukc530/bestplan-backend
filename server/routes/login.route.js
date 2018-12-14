import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authController from '../controllers/auth.controller';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(validate(paramValidation.login), authController.doLogin);

router
    .route('/isadmin')
    .post(validate(paramValidation.login), authController.checkIfClientIsAdmin);

// TODO: enhance conversation with details when id is mentioned
export default router;
