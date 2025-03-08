import express from 'express';
import {createEvent, getEvents} from "../controllers/event.controller";
import validateEvent from "../middlewares/validateEvent";

const router = express.Router();

/**
 * Routes for Event operations
 * - GET '/'            : Get a page of future events sorted
 * - POST '/'           : Create new event. Uses validation middleware to ensure request data is valid.
 */

// Route to get a page of events
router.get('/', getEvents);

// Route to create a new event with validation
router.post('/', validateEvent, createEvent);

export default router;