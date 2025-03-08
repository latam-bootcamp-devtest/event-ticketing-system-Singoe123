import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, 'Route not found'));
}

export default routeNotFound;