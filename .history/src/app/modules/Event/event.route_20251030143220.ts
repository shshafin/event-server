import express from 'express';
import { upload } from '../../middlewares/upload';
import { eventController } from './event.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create event
router.post(
  '/create',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  eventController.createEvent,
);

// Get all events
router.get('/all', eventController.getAllEvents);

// Get single event by ID
router.get('/:id', eventController.getEventById);

// Get events by category
router.get('/category/:category', eventController.getEventsByCategory);


export const EventRoutes = router;
