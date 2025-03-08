import express from 'express';
import { getBookings } from "../controllers/user.controller";

const router = express.Router();

/**
 * Routes for Event operations
 * - GET '/users/:userId/tickets'   : Query past bookings by user
 */


// Route to query past bookings by user
router.get('/:userId/tickets', getBookings);


export default router;