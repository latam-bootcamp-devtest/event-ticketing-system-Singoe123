import express from 'express';
import {createTicket, deleteTicket} from "../controllers/ticket.controller";
import validateTicket from "../middlewares/validateTicket";

const router = express.Router();

/**
 * Routes for Event operations
 * - POST '/'           : Create new ticket. Uses validation middleware to ensure request data is valid.
 */


// Route to create a new ticket with validation
router.post('/', validateTicket, createTicket);

// Route to delete ticket
router.delete('/:ticketId', deleteTicket);

export default router;