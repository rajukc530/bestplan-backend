import express from 'express';
import revenueController from '../controllers/revenue.controller';
import { checkAuthHeader } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/totalrevenue')
    .get(checkAuthHeader, revenueController.getTotalRevenue);

router
    .route('/last30days')
    .get(checkAuthHeader, revenueController.getRevenueOfLast30Days);

router
    .route('/last7days')
    .get(checkAuthHeader, revenueController.getRevenueOfLast7Days);

router
    .route('/lastday')
    .get(checkAuthHeader, revenueController.getRevenueOfLastDay);

router
    .route('/revenuedata')
    .get(checkAuthHeader, revenueController.getRevenueData);

export default router;
