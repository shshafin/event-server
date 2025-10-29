import { z } from 'zod';

export const eventValidationSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  numberOfSeats: z.number().min(1, 'Number of seats must be at least 1'),
  image: z.string().url('Invalid image URL'),
});
