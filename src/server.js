import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import { app } from './app.js';

dotenv.config({
    path: "./.env"
});

// Connect to the database
connectDB()
    .then(() => {
        console.log(`Connected to the database`);
    })
    .catch((err) => {
        console.error(`Error connecting to the database`, err);
    });

// Export the app for Vercel
export default app;