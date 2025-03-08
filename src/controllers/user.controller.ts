import { Request, Response, NextFunction } from "express";
import Event from "../models/event.model";
import ApiError from "../errors/ApiError";
import { isValidObjectId } from "mongoose";
import removeTime from "../utils/removeTime";


export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let { page, pageSize, startDate, endDate, sort } = req.query;
        let { userId } = req.params;

        if(!userId){
            next(new ApiError(400, 'User ID is required.'));
            return;
        }

        if(!isValidObjectId(userId)){
            next(new ApiError(400, 'User ID must be a valid ID'));
            return;
        }

        const pageNum = Math.max(1, parseInt(page as string) || 1);
        const limitNum = Math.max(parseInt(pageSize as string) || 10);
        const order = (sort as string === "-1" ? 0 : 1);
        const start = new Date(startDate as string || -8640000000000000);
        const end = (endDate ? new Date(endDate as string) : new Date);

        const skip = (pageNum - 1) * limitNum;

        const totalEvents : any = await Event.find({ userId: userId })
            .populate('eventId')
            .then((tickets) => {
                tickets.filter((ticket: any) => {
                    return ticket.eventId && ticket.eventId.date >= start && ticket.eventId.date <= end;
                })
                .sort((a: any, b: any) => {
                    return (order ? a.eventId.date - b.eventId.date : b.eventId.date - a.eventId.date)
                });
            })

        console.log(totalEvents);

        const events = totalEvents.slice(skip, skip + limitNum);

        const total = totalEvents.length;

        res.json({
            currentPage: pageNum,
            pageSize: limitNum,
            totalPages: Math.ceil(total / limitNum),
            events: events,
        });

    }catch(err: unknown){
        console.error(err);
        next(new ApiError(500, 'Internal Server Error.'))
    }
}