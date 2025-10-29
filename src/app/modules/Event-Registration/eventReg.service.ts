import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { IEventRegistration } from './eventReg.interface';
import { EventRegistration } from './eventReg.model';

// Register for an event
const registerEvent = async (
  data: IEventRegistration,
): Promise<IEventRegistration> => {
  try {
    const registration = await EventRegistration.create(data);
    return registration;
  } catch (error: any) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || 'Error registering event',
      'Failed to register for event',
    );
  }
};

// Get all bookings for a specific user
const getUserBookings = async (
  userId: string,
): Promise<IEventRegistration[]> => {
  return await EventRegistration.find({ userId }).populate('eventId').lean();
};

// Cancel booking
const cancelBooking = async (
  bookingId: string,
): Promise<IEventRegistration | null> => {
  const booking = await EventRegistration.findByIdAndUpdate(
    bookingId,
    { status: 'cancelled' },
    { new: true },
  );
  return booking;
};

export const eventRegistrationService = {
  registerEvent,
  getUserBookings,
  cancelBooking,
};
