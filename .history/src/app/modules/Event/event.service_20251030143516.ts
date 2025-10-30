import AppError from '../../errors/appError';
import { IEvent } from './event.interface';
import { Event } from './event.model';

// CREATE event
const createEvent = async (data: IEvent): Promise<IEvent> => {
  try {
    return await Event.create(data);
  } catch (error: any) {
    throw new AppError(
      400,
      error.message || 'Error creating event',
      'Failed to create event',
    );
  }
};

// GET all events
const getAllEvents = async (): Promise<IEvent[]> => {
  try {
    return await Event.find().populate('userId', 'username email').lean();
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching events',
      'Failed to get all events',
    );
  }
};

// GET single event by ID
const getEventById = async (id: string): Promise<IEvent | null> => {
  try {
    const event = await Event.findById(id)
      .populate('userId', 'username email')
      .lean();
    if (!event) {
      throw new AppError(
        404,
        `Event with id ${id} not found`,
        'Event not found',
      );
    }
    return event;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      error.message || 'Error fetching event by ID',
      'Failed to get event',
    );
  }
};

// GET events by category
const getEventsByCategory = async (category: string): Promise<IEvent[]> => {
  try {
    return await Event.find({
      category: { $regex: category, $options: 'i' },
    }).lean();
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching events by category',
      'Failed to get events by category',
    );
  }
};

// Search events by name & category
const searchEventsByNameAndCategory = async (
  name?: string,
  category?: string,
): Promise<IEvent[]> => {
  try {
    const nameRegex = name ? { $regex: name, $options: 'i' } : undefined;
    const categoryRegex = category
      ? { $regex: category, $options: 'i' }
      : undefined;

    // Only add $or conditions if regex exists
    const conditions: any[] = [];
    if (nameRegex) conditions.push({ name: nameRegex });
    if (categoryRegex) conditions.push({ category: categoryRegex });

    const query = conditions.length > 0 ? { $or: conditions } : {};

    return await Event.find(query).lean();
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error searching events',
      'Failed to search events',
    );
  }
};

export const eventService = {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByCategory,
  searchEventsByNameAndCategory,
};
