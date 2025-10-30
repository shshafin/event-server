import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { eventService } from './event.service';

// CREATE new event
export const createEvent = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body, userId: req.user?._id };

  if (req.files && (req.files as any).image) {
    payload.image = `/uploads/${(req.files as any).image[0].filename}`;
  } else {
    return res.status(400).json({
      success: false,
      message: 'Image is required',
    });
  }

  const event = await eventService.createEvent(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully',
    data: event,
  });
});

// GET all events
export const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const events = await eventService.getAllEvents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    data: events,
  });
});

// GET single event by ID
export const getEventById = catchAsync(async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const event = await eventService.getEventById(eventId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: event,
  });
});

// GET events by category
export const getEventsByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const category = req.params.category;
    const events = await eventService.getEventsByCategory(category);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Events retrieved successfully by category',
      data: events,
    });
  },
);

// search events by name & category
export const searchEventsByNameAndCategory = catchAsync(
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const category = req.query.category as string;
    const events = await eventService.searchEventsByNameAndCategory(
      name,
      category,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Events retrieved successfully',
      data: events,
    });
  },
);

export const eventController = {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByCategory,
  searchEventsByNameAndCategory,
};
