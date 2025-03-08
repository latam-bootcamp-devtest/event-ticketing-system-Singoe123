import express from 'express';
import { createTicket } from "../controllers/ticket.controller";
import validateTicket from "../middlewares/validateTicket";

const router = express.Router();

/**
 * Routes for Event operations
 * - POST '/'           : Create new ticket. Uses validation middleware to ensure request data is valid.
 */


// Route to create a new event with validation
router.post('/', validateTicket, createTicket);

export default router;