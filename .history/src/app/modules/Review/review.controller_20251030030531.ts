import { RequestHandler } from 'express';
import { ReviewServices } from './review.service';
import httpStatus from 'http-status';

export const createReview: RequestHandler = async (req, res, next) => {
  try {
    const review = await ReviewServices.createReview(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Review added successfully!',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByEvent: RequestHandler = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const reviews = await ReviewServices.getReviewsByEvent(eventId);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Event reviews fetched successfully!',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await ReviewServices.getAllReviews();
    res.status(httpStatus.OK).json({
      success: true,
      message: 'All reviews fetched successfully!',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewControllers = {
  createReview,
  getReviewsByEvent,
  getAllReviews,
};
