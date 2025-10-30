import { Review } from './review.model';

const createReview = async (payload: {
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
}) => {
  const review = await Review.create(payload);
  return review;
};

const getReviewsByEvent = async (eventId: string) => {
  const reviews = await Review.find({ eventId }).populate('userId', 'email');
  return reviews;
};



export const ReviewServices = {
  createReview,
  getReviewsByEvent,
};
