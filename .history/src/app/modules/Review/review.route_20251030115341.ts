import express from 'express';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post('/create', ReviewControllers.createReview);
router.get('/', ReviewControllers.getAllReviews);
router.get('/:eventId', ReviewControllers.getReviewsByEvent);

export const ReviewRoutes = router;
