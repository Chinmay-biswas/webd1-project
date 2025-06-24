//const express = require('express');
//npm i nodemon -d
//npm run dev
import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import { connectDB } from './config/db.js'; // Adjust the path as necessary
import productRoutes from './routes/product.route.js'; // Adjust the path as necessary
import mongoose from 'mongoose';
import Product from "./models/products.models.js";
import cors from 'cors';


const app = express();

app.get("/api", (req, res) => {
  res.send("API is running...");
});
 
app.use(express.json()); //allow us to accept JSON data in the req.body

app.use("/api/products",productRoutes); // Use the product routes
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000


// Allow only your frontend URL (local or deployed)
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.vercel.app'],
  credentials: true // only if you're using cookies/auth
}));

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client/build');
  app.use(express.static(clientBuildPath));

  // any request that falls through (and isn’t /api) will serve index.html
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`Server is running on port http://localhost:${PORT}`);
  
});   
//WYEiI1ymuM6tVJ89 
////WYEiI1ymuM6tVJ89
