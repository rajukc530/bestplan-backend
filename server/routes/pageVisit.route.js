import express from 'express';
// import validate from 'express-validation';
import planVisitController from '../controllers/pageVisit.controller';
// import paramValidation from '../../config/param-validation';
import { checkAuthHeader } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    /**
     * Creates new page visits
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(planVisitController.createPageVisit);

router
    .route('/totalPageVisitCount')
    .get(checkAuthHeader, planVisitController.getTotalPageVisitCount);

router
    .route('/last30days')
    .get(checkAuthHeader, planVisitController.getPageVisitCountOfLast30Days);

router
    .route('/last7days')
    .get(checkAuthHeader, planVisitController.getPageVisitCountOfLast7Days);

router
    .route('/lastday')
    .get(checkAuthHeader, planVisitController.getPageVisitCountOfLastDay);

router
    .route('/pagevisitsdata')
    .get(checkAuthHeader, planVisitController.getPageVisitsData);

router
    .route('/health-check', (req, res) => res.send('OK'));
// TODO: enhance conversation with details when id is mentioned
export default router;
