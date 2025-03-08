import express, {Request, Response} from "express";
import cors from "cors";
import connectDB from "./config/db";
import logger from "./utils/logger";
import routeNotFound from "./middlewares/routeNotFound";
import errorHandler from "./middlewares/errorHandler";
import eventRoutes from "./routes/event.routes";
import ticketRoutes from "./routes/ticket.routes";
import userRoutes from "./routes/user.routes";

// Connect to the MongoDB database
connectDB();

// Define listening port from env (default to 3001)
const port = process.env.PORT || 3001;

// Initialize express
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Enable CORS with default settings
app.use(cors());

// Logger middleware
app.use(logger);

// Basic route to test the server
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!!!");
});

// ROUTES

// Event routes
app.use('/events', eventRoutes);

// Ticket routes
app.use('/tickets', ticketRoutes);

// User routes
app.use('/users', userRoutes);

// Middleware to handle requests to undefined routes (404)
app.use(routeNotFound);

// Global error handling middleware
app.use(errorHandler)

// Start the server listening on the defined port
app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})
