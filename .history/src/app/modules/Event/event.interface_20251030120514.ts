import { Types } from "mongoose";

export interface IEvent {
  id?: string;
  userId?:Types
  name: string;
  date: string;
  location: string;
  category: string;
  description: string;
  numberOfSeats: number;
  image: string;
}
