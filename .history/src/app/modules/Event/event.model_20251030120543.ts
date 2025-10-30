import { Schema, model } from 'mongoose';
import { IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    date: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    numberOfSeats: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', eventSchema);
