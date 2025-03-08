import { Request, Response, NextFunction } from "express";
import Event from "../models/event.model";
import ApiError from "../errors/ApiError";
import { isValidObjectId } from "mongoose";
import removeTime from "../utils/removeTime";

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let { page, pageSize } = req.query;

        const pageNum = Math.max(1, parseInt(page as string) || 1);
        const limitNum = Math.max(parseInt(pageSize as string) || 10);

        const skip = (pageNum - 1) * limitNum;

        const now =  removeTime(new Date());

        const events = await Event.find({ date: {$gte : now}})
            .sort({ date: 1})
            .skip(skip)
            .limit(limitNum);

        const total = await Event.countDocuments();

        res.json({
            currentPage: pageNum,
            pageSize: limitNum,
            totalPages: Math.ceil(total / limitNum),
            events: events,
        });

    }catch(err: unknown){
        next(new ApiError(500, 'Internal Server Error.'))
    }
}

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, date, availableSeats } = req.body;

        const event = new Event({ name, date, availableSeats });
        const newEvent = await event.save();

        res.status(201).json(newEvent);
    }catch(err: unknown){
        next(new ApiError(500, 'Internal Server Error.'));
    }
}

