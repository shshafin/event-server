import express from 'express';
import auth from '../../middlewares/auth';
import { eventRegistrationController } from './eventReg.controller';

const router = express.Router();

// Register for event
router.post('/register', auth(), eventRegistrationController.registerEvent);

// Get all bookings of logged-in user
router.get('/my-bookings', auth(), eventRegistrationController.getUserBookings);

// Cancel a booking
router.patch('/cancel/:id', auth(), eventRegistrationController.cancelBooking);

export const EventRegistrationRoutes = router;
