import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import { isValidObjectId} from "mongoose";

const validateTicket = (req: Request, res: Response,  next: NextFunction) => {
    const { eventId, userId } = req.body;

    if(!eventId || !userId){
        next(new ApiError(400, 'Event ID and user ID are required.'));
        return;
    }

    if(!isValidObjectId(eventId)){
        next(new ApiError(400, 'Event Id must be valid.'));
        return;
    }

    if(!isValidObjectId(userId)){
        next(new ApiError(400, 'User Id must be valid.'));
        return;
    }

    next();
}

export default validateTicket;