import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { eventRegistrationService } from './eventReg.service';

// Register for event
export const registerEvent = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body, userId: req.user?._id }; // assuming auth middleware adds req.user
  const booking = await eventRegistrationService.registerEvent(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event registered successfully',
    data: booking,
  });
});

// Get user bookings
export const getUserBookings = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const bookings = await eventRegistrationService.getUserBookings(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User bookings retrieved successfully',
      data: bookings,
    });
  },
);

// Cancel booking
export const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const cancelled = await eventRegistrationService.cancelBooking(bookingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: cancelled,
  });
});

export const eventRegistrationController = {
  registerEvent,
  getUserBookings,
  cancelBooking,
};
