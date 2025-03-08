import express from 'express';
import { createEvent } from "../controllers/event.controller";
import validateEvent from "../middlewares/validateEvent";

const router = express.Router();

/**
 * Routes for Event operations
 * - POST '/'           : Create new event. Uses validation middleware to ensure request data is valid.
 */

// Route to create a new event with validation

router.post('/', validateEvent, createEvent);

export default router;