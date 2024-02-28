import express, { ErrorRequestHandler } from 'express';
import routes from './routes';
import { initializeDatabase } from './databaseConnection';
import {initDatabase} from "./models/Database";

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
// Middleware
app.use(express.json());

// Routes
app.use(routes);

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

initDatabase().then();
initializeDatabase().then();