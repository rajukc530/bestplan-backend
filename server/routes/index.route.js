import express from 'express';
import loginRoute from './login.route';
import registrationRoute from './userRegistration.route';
import trainingRoute from './training.route';
import dietRoute from './diet.route';
import planRoute from './plan.route';
import pageVisitRoute from './pageVisit.route';
import revenueRoute from './revenue.route';
import userWeightRoute from './userWeight.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/login', loginRoute);

router.use('/user', registrationRoute);

router.use('/training', trainingRoute);

router.use('/diet', dietRoute);

router.use('/plan', planRoute);

router.use('/pagevisit', pageVisitRoute);

router.use('/revenue', revenueRoute);

router.use('/updateweight', userWeightRoute);

export default router;
