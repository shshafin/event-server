import { Types } from 'mongoose';

export interface IEventRegistration {
  id?: string;
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  paymentMethod?: string;
  status?: 'confirmed' | 'cancelled';
}
