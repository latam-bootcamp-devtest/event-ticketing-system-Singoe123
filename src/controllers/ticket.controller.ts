import { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticket.model";
import Event from "../models/event.model";
import ApiError from "../errors/ApiError";

export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {eventId, userId} = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            next(new ApiError(404, 'Event not found.'));
            return;
        }
        if(event.availableSeats == 0){
            next(new ApiError(409, 'Event has no available seats.'));
            return;
        }

        // const user = await User.findById(userId);
        // if(!user){
        //     next(new ApiError(404, 'User not found.'));
        // }

        await Event.findByIdAndUpdate(eventId,{ ...event.toObject(), availableSeats: event.availableSeats-1 });

        const ticket = new Ticket({ eventId, userId });
        const newTicket = await ticket.save();

        res.status(201).json(newTicket);
    }catch(err : unknown){
        next(new ApiError(500, 'Internal Server Error.'))
    }
}