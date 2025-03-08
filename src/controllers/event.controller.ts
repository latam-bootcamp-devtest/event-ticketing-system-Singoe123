import { Request, Response, NextFunction } from "express";
import Event from "../models/event.model";
import ApiError from "../errors/ApiError";
import { isValidObjectId } from "mongoose";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, date, availableSeats } = req.body;
        
        const event = new Event({ name, date, availableSeats });
        const newEvent = await event.save();

        res.status(201).json(newEvent);
    }catch(err: unknown){
        next(new ApiError(500, 'Internal Server Error'));
    }
}