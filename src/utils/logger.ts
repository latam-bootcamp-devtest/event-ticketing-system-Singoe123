import { Request, Response, NextFunction} from "express";

// Logger middleware to log HTTP method and URL of each request;
const logger = (req: Request, res: Response, next: NextFunction)=> {
    console.log(`${req.method}: ${req.originalUrl}`);
    next(); // Call next function;
}

export default logger;