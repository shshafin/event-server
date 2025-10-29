import { Schema, model } from 'mongoose';
import { IEventRegistration } from './eventReg.interface';

const eventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfTickets: { type: Number, required: true },
    paymentMethod: { type: String },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true },
);

export const EventRegistration = model<IEventRegistration>(
  'EventRegistration',
  eventRegistrationSchema,
);
