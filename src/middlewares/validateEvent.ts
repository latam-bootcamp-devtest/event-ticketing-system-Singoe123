import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";

const validateEvent = (req: Request, res: Response,  next: NextFunction) => {
    const { name, date, availableSeats } = req.body;
    console.log(name, date, availableSeats);

    if(!name || !date){
        next(new ApiError(400, 'Name and date are required.'));
        return;
    }

    const requestDate = new Date(date);
    const today = new Date();

    const requestDateString = requestDate.toISOString().split("T")[0];
    const todayString = today.toISOString().split("T")[0];

    if(isNaN(requestDate.getTime()) || requestDateString < todayString){
        next(new ApiError(400, 'Date must not be in the past.'));
        return;
    }

    if(typeof availableSeats !== "number" || availableSeats <= 0){
        next(new ApiError(400, 'Available seats must be a valid number and greater than zero.'));
        return;
    }

    next();
}

export default validateEvent;