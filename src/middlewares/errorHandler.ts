import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";

// Error handler middleware to centralize error handling;
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Check if is instance of ApiError
    if(err instanceof ApiError){
        // Send JSON response with error status code and message
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    
    // Log the error to the console for debugging
    console.error(err);
    // Send generic 500 response
    res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;