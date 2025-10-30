import { Types } from 'mongoose';

export interface IEvent {
  id?: string;
  userId?: Types.ObjectId;
  name: string;
  date: string;
  location: string;
  category: string;
  description: string;
  numberOfSeats: number;
  image: string;
}
