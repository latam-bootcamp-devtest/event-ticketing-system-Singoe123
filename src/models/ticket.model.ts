import { Schema, model, Document } from "mongoose";

export interface ITicket extends Document {
    eventId: Schema.Types.ObjectId;
    userId: string;
}

const TicketSchema = new Schema<ITicket>(
    {
        eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        userId: { type: String, required: true }
    }
)

const Ticket = model<ITicket>('Ticket', TicketSchema);

export default Ticket;