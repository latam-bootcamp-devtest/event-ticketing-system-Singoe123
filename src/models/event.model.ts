import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
    name: string;
    date: Date;
    availableSeats: number;
}

const EventSchema = new Schema<IEvent>(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true },
        availableSeats: { type: Number, required: true, min: 0 },
    }
)

const Event = model<IEvent>('Event', EventSchema);

export default Event;